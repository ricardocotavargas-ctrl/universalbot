const Business = require('../models/Business');

const businessMiddleware = async (req, res, next) => {
  try {
    // Por ahora usamos businessId temporal - luego vendrá del usuario
    req.businessId = '000000000000000000000001';
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error en middleware de negocio' });
  }
};

module.exports = businessMiddleware;
