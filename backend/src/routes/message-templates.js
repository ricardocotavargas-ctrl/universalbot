const express = require('express');
const router = express.Router();
const MessageTemplate = require('../models/MessageTemplate');
const { authenticate } = require('../middleware/auth');
const { tenantMiddleware } = require('../middleware/tenant');

const template = new MessageTemplate();

// Crear plantilla
router.post('/', authenticate, tenantMiddleware, async (req, res) => {
  try {
    const templateData = {
      ...req.body,
      tenant_id: req.tenant.id
    };

    const newTemplate = await template.create(templateData);
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener plantillas del tenant
router.get('/', authenticate, tenantMiddleware, async (req, res) => {
  try {
    const { category } = req.query;
    const templates = await template.findByTenant(req.tenant.id, category);
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aprobar/Rechazar plantilla (solo admin)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status, rejection_reason } = req.body;
    const updated = await template.updateStatus(req.params.id, status, rejection_reason);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar plantilla
router.delete('/:id', authenticate, tenantMiddleware, async (req, res) => {
  try {
    const deleted = await template.delete(req.params.id, req.tenant.id);
    res.json({ message: 'Plantilla eliminada', template: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;