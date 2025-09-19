const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticate } = require('../middleware/auth');
const { tenantMiddleware } = require('../middleware/tenant');
const Tenant = require('../models/Tenant');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tenantId = req.tenant?.id || 'global';
    const uploadPath = `uploads/${tenantId}/logos`;
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'logo-' + uniqueSuffix + extension);
  }
});

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (JPEG, PNG, GIF, WebP)'));
    }
  }
});

router.post('/logo', authenticate, tenantMiddleware, upload.single('logo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No se subió ningún archivo' 
      });
    }

    const tenantModel = new Tenant();
    const logoPath = `/uploads/${req.tenant.id}/logos/${req.file.filename}`;
    
    const updatedTenant = await tenantModel.updateLogo(req.tenant.id, logoPath);

    res.json({
      success: true,
      message: 'Logo actualizado correctamente',
      data: {
        logoUrl: logoPath,
        tenant: {
          id: updatedTenant.id,
          business_name: updatedTenant.business_name,
          industry: updatedTenant.industry
        }
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

router.use('/uploads', express.static('uploads'));

router.get('/industry-config/:industry', async (req, res) => {
  try {
    const tenantModel = new Tenant();
    const config = await tenantModel.getIndustryConfig(req.params.industry);

    res.json({
      success: true,
      industry: req.params.industry,
      config: config
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

router.delete('/logo', authenticate, tenantMiddleware, async (req, res) => {
  try {
    const tenantModel = new Tenant();
    
    const updatedTenant = await tenantModel.updateLogo(req.tenant.id, null);

    if (req.tenant.config?.logo) {
      const logoPath = req.tenant.config.logo.replace('/uploads/', 'uploads/');
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    res.json({
      success: true,
      message: 'Logo eliminado correctamente',
      data: {
        tenant: {
          id: updatedTenant.id,
          business_name: updatedTenant.business_name,
          config: updatedTenant.config
        }
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;