// src/services/EmailService.js
const nodemailer = require('nodemailer');

// Configurar transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Plantilla de email base
const baseTemplate = (content) => `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UniversalBot</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px 30px;
        text-align: center;
      }
      .header h1 {
        font-size: 28px;
        margin-bottom: 10px;
        font-weight: 700;
      }
      .header p {
        font-size: 16px;
        opacity: 0.9;
      }
      .content {
        padding: 40px 30px;
      }
      .footer {
        background: #f8f9fa;
        padding: 25px 30px;
        text-align: center;
        color: #666;
        font-size: 12px;
        border-top: 1px solid #eee;
      }
      .button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 14px 28px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        margin: 20px 0;
        transition: transform 0.2s;
      }
      .button:hover {
        transform: translateY(-2px);
      }
      .info-box {
        background: #f8f9fa;
        border-left: 4px solid #667eea;
        padding: 20px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .info-box h3 {
        color: #667eea;
        margin-bottom: 10px;
      }
      .divider {
        height: 1px;
        background: linear-gradient(to right, transparent, #ddd, transparent);
        margin: 25px 0;
      }
      @media (max-width: 600px) {
        .header {
          padding: 30px 20px;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          padding: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>UniversalBot</h1>
        <p>Plataforma de Automatización Inteligente</p>
      </div>
      
      <div class="content">
        ${content}
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} UniversalBot. Todos los derechos reservados.</p>
        <p>Si tienes alguna pregunta, contáctanos: support@universalbot.com</p>
      </div>
    </div>
  </body>
  </html>
`;

// Función principal para enviar emails
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    // Validar parámetros
    if (!to || !subject || !html) {
      throw new Error('Missing required email parameters');
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'UniversalBot <noreply@universalbot.com>',
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: subject,
      html: baseTemplate(html),
      text: text || html.replace(/<[^>]*>/g, '')
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

// Email específico para facturas
const sendInvoiceEmail = async (business, invoice, plan) => {
  const html = `
    <h2>Nueva Factura Generada 🧾</h2>
    <p>Hola <strong>${business.name}</strong>,</p>
    
    <p>Se ha generado una nueva factura para tu plan <strong>${plan.name}</strong>.</p>
    
    <div class="info-box">
      <h3>📋 Detalles de la Factura</h3>
      <p><strong>Número:</strong> ${invoice.invoiceNumber}</p>
      <p><strong>Monto:</strong> $${invoice.amount} USD</p>
      <p><strong>Vencimiento:</strong> ${invoice.dueDate.toLocaleDateString()}</p>
      <p><strong>Método de Pago:</strong> ${invoice.paymentMethod}</p>
      <p><strong>Estado:</strong> <span style="color: ${invoice.paymentStatus === 'completed' ? '#28a745' : '#dc3545'}">${invoice.paymentStatus}</span></p>
    </div>
    
    <div class="divider"></div>
    
    <p>Por favor realiza el pago antes de la fecha de vencimiento para evitar interrupciones en tu servicio.</p>
    
    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/invoices/${invoice._id}" class="button">
        👀 Ver Factura Completa
      </a>
    </div>
    
    <p>Si ya realizaste el pago, por favor ignora este mensaje.</p>
  `;

  return sendEmail({
    to: business.email,
    subject: `🧾 Nueva Factura #${invoice.invoiceNumber} - UniversalBot`,
    html
  });
};

// Email de recordatorio de pago
const sendPaymentReminder = async (invoice, business) => {
  const html = `
    <h2>Recordatorio de Pago ⏰</h2>
    <p>Hola <strong>${business.name}</strong>,</p>
    
    <p>Te recordamos que tu factura #${invoice.invoiceNumber} está próxima a vencer.</p>
    
    <div class="info-box">
      <h3>📅 Detalles del Vencimiento</h3>
      <p><strong>Fecha de vencimiento:</strong> ${invoice.dueDate.toLocaleDateString()}</p>
      <p><strong>Días restantes:</strong> ${invoice.daysUntilDue} días</p>
      <p><strong>Monto a pagar:</strong> $${invoice.amount} USD</p>
      <p><strong>Método de pago:</strong> ${invoice.paymentMethod}</p>
    </div>
    
    <div class="divider"></div>
    
    <p>Por favor realiza el pago a tiempo para mantener tu servicio activo.</p>
    
    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/invoices/${invoice._id}" class="button">
        💳 Realizar Pago
      </a>
    </div>
    
    <p>Si ya realizaste el pago, por favor contáctanos para actualizar tu estado.</p>
  `;

  return sendEmail({
    to: business.email,
    subject: `⏰ Recordatorio de Pago #${invoice.invoiceNumber} - UniversalBot`,
    html
  });
};

// Email de bienvenida
const sendWelcomeEmail = async (user, business) => {
  const html = `
    <h2>¡Bienvenido a UniversalBot! 🎉</h2>
    <p>Hola <strong>${user.first_name} ${user.last_name}</strong>,</p>
    
    <p>Te damos la más cordial bienvenida a UniversalBot, la plataforma de automatización inteligente que transformará tu negocio.</p>
    
    <div class="info-box">
      <h3>🚀 Comienza Ahora</h3>
      <p><strong>Empresa:</strong> ${business.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Tu cuenta está:</strong> <span style="color: #28a745;">Activa ✓</span></p>
    </div>
    
    <div class="divider"></div>
    
    <h3>📋 Próximos Pasos:</h3>
    <ol style="margin-left: 20px; margin-bottom: 20px;">
      <li>Completa tu perfil de empresa</li>
      <li>Configura tus canales de comunicación</li>
      <li>Personaliza tus respuestas automáticas</li>
      <li>Explora las funciones avanzadas</li>
    </ol>
    
    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/onboarding" class="button">
        🏁 Comenzar Configuración
      </a>
    </div>
    
    <p>Estamos aquí para ayudarte. ¡No dudes en contactarnos!</p>
  `;

  return sendEmail({
    to: user.email,
    subject: `🎉 ¡Bienvenido a UniversalBot!`,
    html
  });
};

module.exports = {
  sendEmail,
  sendInvoiceEmail,
  sendPaymentReminder,
  sendWelcomeEmail
};