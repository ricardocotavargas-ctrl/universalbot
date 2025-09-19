// src/routes/plans.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Plan = require('../models/Plan');
const Business = require('../models/Business');
const Invoice = require('../models/Invoice');
const { sendEmail } = require('../services/EmailService');

// Crear un nuevo plan
router.post('/create', auth, async (req, res) => {
  try {
    const {
      name,
      price,
      interval = 'month',
      features = {},
      limits = {},
      industries = [],
      isActive = true,
      isPublic = true,
      metadata = {}
    } = req.body;

    // Validar que el plan no exista
    const existingPlan = await Plan.findOne({ name });
    if (existingPlan) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    // Generar ID único para el plan
    const planCode = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

    // Guardar plan en base de datos
    const plan = new Plan({
      name,
      price,
      interval,
      planCode,
      features: {
        whatsapp: features.whatsapp || false,
        facebook: features.facebook || false,
        instagram: features.instagram || false,
        email: features.email || false,
        webchat: features.webchat || false,
        ai_responses: features.ai_responses || false,
        analytics_basic: features.analytics_basic || false,
        analytics_advanced: features.analytics_advanced || false,
        multi_business: features.multi_business || false,
        priority_support: features.priority_support || false,
        custom_branding: features.custom_branding || false,
        api_access: features.api_access || false
      },
      limits: {
        messages: limits.messages || 1000,
        businesses: limits.businesses || 1,
        users: limits.users || 2,
        storage: limits.storage || 5,
        contacts: limits.contacts || 5000
      },
      industries,
      isActive,
      isPublic,
      createdBy: req.user.id,
      metadata
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ error: 'Error creating plan' });
  }
});

// Asignar plan a cliente manualmente
router.post('/assign', auth, async (req, res) => {
  try {
    const { businessId, planId, paymentMethod, paymentDetails = {} } = req.body;

    const business = await Business.findById(businessId);
    const plan = await Plan.findById(planId);

    if (!business || !plan) {
      return res.status(404).json({ error: 'Business or plan not found' });
    }

    // Calcular fechas del período
    const now = new Date();
    const periodEnd = new Date(now);
    
    if (plan.interval === 'month') {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else if (plan.interval === 'year') {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    // Crear invoice
    const invoice = new Invoice({
      businessId: business._id,
      planId: plan._id,
      amount: plan.price,
      currency: 'USD',
      paymentMethod: paymentMethod || 'cash',
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'completed',
      paymentDetails,
      dueDate: periodEnd,
      periodStart: now,
      periodEnd
    });

    await invoice.save();

    // Actualizar negocio con información del plan
    business.plan = {
      planId: plan._id,
      currentPlan: plan.name,
      status: paymentMethod === 'cash' ? 'pending' : 'active',
      currentPeriodEnd: periodEnd,
      features: plan.features,
      limits: plan.limits,
      paymentMethod: paymentMethod || 'cash',
      lastInvoice: invoice._id,
      activatedAt: paymentMethod === 'cash' ? null : new Date()
    };

    await business.save();

    // Enviar email de confirmación
    await sendPlanActivationEmail(business, plan, invoice);

    // Webhook interno para procesamiento adicional
    await processPlanAssignmentWebhook(business, plan, invoice);

    res.json({
      success: true,
      message: 'Plan assigned successfully',
      invoice: invoice,
      business: business
    });
  } catch (error) {
    console.error('Error assigning plan:', error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los planes públicos
router.get('/public', async (req, res) => {
  try {
    const plans = await Plan.find({ isPublic: true, isActive: true })
      .sort({ price: 1 })
      .select('-createdBy -metadata');
    
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: 'Error fetching plans' });
  }
});

// Obtener plan por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({ error: 'Error fetching plan' });
  }
});

// Actualizar plan
router.put('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    res.json(plan);
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ error: 'Error updating plan' });
  }
});

// Eliminar plan (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ error: 'Error deleting plan' });
  }
});

// Endpoint para webhooks de confirmación de pagos externos
router.post('/webhook/payment-confirmation', async (req, res) => {
  try {
    const { invoiceId, transactionId, paymentStatus, confirmedAt } = req.body;
    
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Actualizar invoice
    invoice.paymentStatus = paymentStatus || 'completed';
    invoice.transactionId = transactionId;
    invoice.paidAt = confirmedAt || new Date();
    await invoice.save();
    
    // Actualizar negocio si el pago fue exitoso
    if (invoice.paymentStatus === 'completed') {
      await Business.findByIdAndUpdate(invoice.businessId, {
        $set: { 
          'plan.status': 'active',
          'plan.activatedAt': new Date()
        }
      });
      
      // Enviar email de confirmación
      const business = await Business.findById(invoice.businessId);
      const plan = await Plan.findById(invoice.planId);
      await sendPaymentConfirmationEmail(business, plan, invoice);
    }
    
    res.json({ success: true, message: 'Payment status updated' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Sistema de recordatorios de pago
router.get('/reminders/due', auth, async (req, res) => {
  try {
    // Encontrar invoices próximos a vencer (3 días)
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const upcomingInvoices = await Invoice.find({
      paymentStatus: 'pending',
      dueDate: { $lte: threeDaysFromNow }
    }).populate('businessId', 'name email');
    
    // Encontrar invoices vencidos
    const now = new Date();
    const overdueInvoices = await Invoice.find({
      paymentStatus: 'pending',
      dueDate: { $lt: now }
    }).populate('businessId', 'name email');
    
    res.json({ 
      success: true, 
      upcoming: upcomingInvoices,
      overdue: overdueInvoices
    });
  } catch (error) {
    console.error('Error fetching due invoices:', error);
    res.status(500).json({ error: 'Error fetching due invoices' });
  }
});

// Función de webhook interno
async function processPlanAssignmentWebhook(business, plan, invoice) {
  try {
    console.log(`Webhook: Plan ${plan.name} assigned to ${business.name}`);
    
    // Simular procesamiento asíncrono
    setTimeout(async () => {
      try {
        // Aquí puedes agregar lógica adicional
        // Por ejemplo: sincronizar con CRM, notificar al equipo, etc.
        
        console.log(`Plan activation webhook processed for ${business.name}`);
      } catch (error) {
        console.error('Webhook processing error:', error);
      }
    }, 1000);
    
  } catch (error) {
    console.error('Webhook error:', error);
  }
}

// Funciones de email
async function sendPlanActivationEmail(business, plan, invoice) {
  try {
    const emailTemplate = `
      <h2>¡Bienvenido a UniversalBot Premium!</h2>
      <p>Hola <strong>${business.name}</strong>,</p>
      <p>Tu plan <strong>${plan.name}</strong> ha sido activado exitosamente.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>📋 Detalles del Plan</h3>
        <p><strong>Precio:</strong> $${plan.price}/${plan.interval}</p>
        <p><strong>Método de pago:</strong> ${invoice.paymentMethod}</p>
        <p><strong>Próximo vencimiento:</strong> ${invoice.dueDate.toLocaleDateString()}</p>
        <p><strong>Número de invoice:</strong> ${invoice.invoiceNumber}</p>
      </div>
      
      <p>🎉 ¡Accede a tu panel para comenzar a usar todas las funciones premium!</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" 
           style="background: #667eea; color: white; padding: 15px 30px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Ir al Dashboard
        </a>
      </div>
    `;
    
    await sendEmail({
      to: business.email,
      subject: `✅ Activación de Plan ${plan.name} - UniversalBot`,
      html: emailTemplate
    });
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
}

async function sendPaymentConfirmationEmail(business, plan, invoice) {
  try {
    const emailTemplate = `
      <h2>¡Pago Confirmado! 💰</h2>
      <p>Hola <strong>${business.name}</strong>,</p>
      <p>Hemos confirmado tu pago por el plan <strong>${plan.name}</strong>.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>📊 Detalles del Pago</h3>
        <p><strong>Monto:</strong> $${invoice.amount} USD</p>
        <p><strong>Método:</strong> ${invoice.paymentMethod}</p>
        <p><strong>Transacción:</strong> ${invoice.transactionId || 'N/A'}</p>
        <p><strong>Fecha:</strong> ${invoice.paidAt.toLocaleDateString()}</p>
        <p><strong>Invoice:</strong> ${invoice.invoiceNumber}</p>
      </div>
      
      <p>¡Gracias por tu preferencia! 🚀</p>
    `;
    
    await sendEmail({
      to: business.email,
      subject: `💰 Confirmación de Pago - UniversalBot`,
      html: emailTemplate
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

module.exports = router;