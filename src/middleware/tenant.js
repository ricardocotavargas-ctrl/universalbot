const Tenant = require('../models/Tenant');

const tenantMiddleware = async (req, res, next) => {
  try {
    const tenantIdentifier = req.headers['x-tenant-id'] || 
                            req.user?.tenant_id || 
                            req.query.tenant_id;
    
    if (!tenantIdentifier) {
      return res.status(400).json({ error: 'Tenant identifier required' });
    }

    const tenant = new Tenant();
    let tenantData;

    if (!isNaN(tenantIdentifier)) {
      tenantData = await tenant.findById(tenantIdentifier);
    } else {
      tenantData = await tenant.findBySubdomain(tenantIdentifier);
    }

    if (!tenantData) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    req.tenant = tenantData;
    next();

  } catch (error) {
    res.status(500).json({ error: 'Tenant resolution failed' });
  }
};

const optionalTenantMiddleware = async (req, res, next) => {
  try {
    const tenantIdentifier = req.headers['x-tenant-id'] || 
                            req.user?.tenant_id || 
                            req.query.tenant_id;

    if (tenantIdentifier) {
      const tenant = new Tenant();
      let tenantData;

      if (!isNaN(tenantIdentifier)) {
        tenantData = await tenant.findById(tenantIdentifier);
      } else {
        tenantData = await tenant.findBySubdomain(tenantIdentifier);
      }

      if (tenantData) {
        req.tenant = tenantData;
      }
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = { tenantMiddleware, optionalTenantMiddleware };