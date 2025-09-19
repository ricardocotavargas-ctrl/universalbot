const { pool } = require('../core/database');

class Tenant {
  async create(tenantData) {
    const { business_name, industry, owner_id, subdomain, config = {}, settings = {} } = tenantData;

    const query = `
      INSERT INTO tenants (business_name, industry, owner_id, subdomain, config, settings)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const defaultConfig = {
      logo: null,
      primary_color: '#667eea',
      secondary_color: '#764ba2',
      theme: 'light'
    };

    const defaultSettings = {
      whatsapp_enabled: true,
      email_enabled: true,
      sms_enabled: false,
      auto_responses: true,
      business_hours: {
        enabled: false,
        timezone: 'America/Caracas',
        hours: {}
      }
    };

    const values = [
      business_name,
      industry,
      owner_id,
      subdomain,
      JSON.stringify({ ...defaultConfig, ...config }),
      JSON.stringify({ ...defaultSettings, ...settings })
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    const query = 'SELECT * FROM tenants WHERE id = $1 AND status = $2';
    try {
      const result = await pool.query(query, [id, 'active']);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findBySubdomain(subdomain) {
    const query = 'SELECT * FROM tenants WHERE subdomain = $1 AND status = $2';
    try {
      const result = await pool.query(query, [subdomain, 'active']);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateLogo(tenantId, logoUrl) {
    const query = `
      UPDATE tenants 
      SET config = jsonb_set(
        COALESCE(config, '{}'::jsonb), 
        '{logo}', 
        $2, 
        true
      ), updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [tenantId, JSON.stringify(logoUrl)]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getIndustryConfig(industry) {
    const industryConfigs = {
      ecommerce: {
        features: ['products', 'orders', 'payments', 'inventory', 'shipping', 'catalog', 'coupons'],
        required: ['product_catalog', 'payment_gateway'],
        modules: ['EcommerceModule', 'PaymentModule', 'InventoryModule'],
        workflows: ['order_processing', 'abandoned_cart', 'product_recommendations']
      },
      healthcare: {
        features: ['appointments', 'patients', 'prescriptions', 'medical_records', 'doctors', 'billing'],
        required: ['appointment_scheduling', 'patient_forms'],
        modules: ['HealthcareModule', 'AppointmentModule', 'BillingModule'],
        workflows: ['appointment_reminders', 'patient_followup', 'prescription_management']
      },
      education: {
        features: ['courses', 'students', 'enrollments', 'certificates', 'classes', 'assignments'],
        required: ['course_management', 'payment_processing'],
        modules: ['EducationModule', 'CourseModule', 'CertificateModule'],
        workflows: ['student_onboarding', 'course_completion', 'certificate_generation']
      },
      restaurant: {
        features: ['menu', 'orders', 'reservations', 'delivery', 'tables', 'ingredients'],
        required: ['menu_management', 'order_tracking'],
        modules: ['RestaurantModule', 'DeliveryModule', 'ReservationModule'],
        workflows: ['order_processing', 'table_management', 'delivery_tracking']
      },
      default: {
        features: ['basic_messaging', 'customer_management', 'notifications'],
        required: [],
        modules: ['BasicModule'],
        workflows: ['customer_support', 'notification_management']
      }
    };

    return industryConfigs[industry] || industryConfigs.default;
  }

  async updateSettings(tenantId, newSettings) {
    const query = `
      UPDATE tenants 
      SET settings = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [tenantId, JSON.stringify(newSettings)]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async listAll(limit = 100, offset = 0) {
    const query = `
      SELECT * FROM tenants 
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async deactivate(tenantId) {
    const query = `
      UPDATE tenants 
      SET status = 'inactive', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [tenantId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Tenant;