const { pool } = require('../core/database');

class Transaction {
  async create(transactionData) {
    const {
      business_id,
      customer_id,
      order_id = null,
      amount,
      currency = 'USD',
      payment_method,
      payment_gateway,
      status = 'pending',
      transaction_id = null,
      metadata = {}
    } = transactionData;

    const query = `
      INSERT INTO payments (business_id, customer_id, order_id, amount, currency, 
                           payment_method, payment_gateway, status, transaction_id, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const values = [
      business_id,
      customer_id,
      order_id,
      amount,
      currency,
      payment_method,
      payment_gateway,
      status,
      transaction_id,
      JSON.stringify(metadata)
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async findById(id) {
    const query = 'SELECT * FROM payments WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding transaction:', error);
      throw error;
    }
  }

  async findByBusiness(businessId, limit = 100, offset = 0) {
    const query = `
      SELECT p.*, c.phone_number, c.user_data->>'name' as customer_name,
             o.order_number
      FROM payments p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN orders o ON p.order_id = o.id
      WHERE p.business_id = $1
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    try {
      const result = await pool.query(query, [businessId, limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error finding transactions by business:', error);
      throw error;
    }
  }

  async updateStatus(transactionId, status, transactionIdExternal = null) {
    const query = `
      UPDATE payments 
      SET status = $1, transaction_id = COALESCE($2, transaction_id), updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [status, transactionIdExternal, transactionId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating transaction status:', error);
      throw error;
    }
  }

  async getRevenueStats(businessId, startDate, endDate) {
    const query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as transaction_count,
        SUM(amount) as total_revenue,
        AVG(amount) as average_order_value
      FROM payments 
      WHERE business_id = $1 
      AND status = 'completed'
      AND created_at BETWEEN $2 AND $3
      GROUP BY DATE(created_at)
      ORDER BY date
    `;

    try {
      const result = await pool.query(query, [businessId, startDate, endDate]);
      return result.rows;
    } catch (error) {
      console.error('Error getting revenue stats:', error);
      throw error;
    }
  }

  async findByOrderId(orderId) {
    const query = 'SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [orderId]);
      return result.rows;
    } catch (error) {
      console.error('Error finding transactions by order:', error);
      throw error;
    }
  }

  async search(businessId, searchTerm, limit = 50, offset = 0) {
    const query = `
      SELECT p.*, c.phone_number, c.user_data->>'name' as customer_name,
             o.order_number
      FROM payments p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN orders o ON p.order_id = o.id
      WHERE p.business_id = $1
      AND (c.phone_number ILIKE $2 OR o.order_number ILIKE $2 OR p.transaction_id ILIKE $2)
      ORDER BY p.created_at DESC
      LIMIT $3 OFFSET $4
    `;

    try {
      const result = await pool.query(query, [businessId, `%${searchTerm}%`, limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error searching transactions:', error);
      throw error;
    }
  }

  async countByStatus(businessId, status) {
    const query = 'SELECT COUNT(*) as count FROM payments WHERE business_id = $1 AND status = $2';
    try {
      const result = await pool.query(query, [businessId, status]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error('Error counting transactions by status:', error);
      throw error;
    }
  }
}

module.exports = Transaction;