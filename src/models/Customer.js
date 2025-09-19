const { pool } = require('../core/database');

class Customer {
  async create(customerData) {
    const { business_id, phone_number, platform = 'whatsapp', name = null, email = null } = customerData;

    const query = `
      INSERT INTO customers 
        (business_id, phone_number, name, email, platform) 
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (business_id, phone_number) 
      DO UPDATE SET 
        last_interaction = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

    const values = [business_id, phone_number, name, email, platform];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async countByBusiness(businessId) {
    const query = 'SELECT COUNT(*) FROM customers WHERE business_id = $1';
    const result = await pool.query(query, [businessId]);
    return parseInt(result.rows[0].count);
  }

  async countNewThisMonth(businessId) {
    const query = `
      SELECT COUNT(*) FROM customers 
      WHERE business_id = $1 
      AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
    `;
    const result = await pool.query(query, [businessId]);
    return parseInt(result.rows[0].count);
  }

  async findByPhone(businessId, phoneNumber) {
    const query = `SELECT * FROM customers WHERE business_id = $1 AND phone_number = $2`;
    
    try {
      const result = await pool.query(query, [businessId, phoneNumber]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding customer by phone:', error);
      throw error;
    }
  }

  async findById(customerId) {
    const query = `SELECT * FROM customers WHERE id = $1`;
    
    try {
      const result = await pool.query(query, [customerId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding customer by ID:', error);
      throw error;
    }
  }

  async updateLastInteraction(customerId) {
    const query = `
      UPDATE customers 
      SET last_interaction = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [customerId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating customer interaction:', error);
      throw error;
    }
  }

  async listByBusiness(businessId, limit = 100, offset = 0) {
    const query = `
      SELECT * FROM customers 
      WHERE business_id = $1 
      ORDER BY last_interaction DESC 
      LIMIT $2 OFFSET $3
    `;

    try {
      const result = await pool.query(query, [businessId, limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error listing customers:', error);
      throw error;
    }
  }
}

module.exports = Customer;