const { pool } = require('../core/database');

class Business {
  async create(businessData) {
    const { name, email, industry, tenant_id, created_by, settings = {}, plan = {} } = businessData;

    const query = `
      INSERT INTO businesses 
        (name, email, industry, tenant_id, created_by, settings, plan, status, is_active) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      name,
      email,
      industry,
      tenant_id,
      created_by,
      JSON.stringify(settings),
      JSON.stringify(plan),
      'active',
      true
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating business:', error);
      throw error;
    }
  }

  async findById(id, tenantId = null) {
    let query = `SELECT * FROM businesses WHERE id = $1`;
    let values = [id];

    if (tenantId) {
      query += ` AND tenant_id = $2`;
      values.push(tenantId);
    }

    query += ` AND status = 'active'`;

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding business by ID:', error);
      throw error;
    }
  }

  async findByTenant(tenantId) {
    const query = `SELECT * FROM businesses WHERE tenant_id = $1 AND status = 'active'`;
    
    try {
      const result = await pool.query(query, [tenantId]);
      return result.rows;
    } catch (error) {
      console.error('Error finding businesses by tenant:', error);
      throw error;
    }
  }

  async updatePlan(businessId, planData) {
    const query = `
      UPDATE businesses 
      SET plan = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [businessId, JSON.stringify(planData)]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating business plan:', error);
      throw error;
    }
  }

  async updateSettings(businessId, settings) {
    const query = `
      UPDATE businesses 
      SET settings = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [businessId, JSON.stringify(settings)]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating business settings:', error);
      throw error;
    }
  }

  async deactivate(businessId) {
    const query = `
      UPDATE businesses 
      SET status = 'inactive', is_active = false, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [businessId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deactivating business:', error);
      throw error;
    }
  }

  async hasFeature(businessId, feature) {
    try {
      const business = await this.findById(businessId);
      if (!business || !business.plan) return false;
      
      const plan = typeof business.plan === 'string' ? JSON.parse(business.plan) : business.plan;
      return plan.features?.[feature] === true;
    } catch (error) {
      console.error('Error checking business feature:', error);
      return false;
    }
  }
}

module.exports = Business;