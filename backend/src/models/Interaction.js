const { pool } = require('../core/database');

class Interaction {
  async create(interactionData) {
    const {
      business_id,
      customer_id,
      message,
      response,
      intent,
      confidence = 0.8,
      platform = 'whatsapp',
      satisfaction_rating = null
    } = interactionData;

    const query = `
      INSERT INTO interactions (business_id, customer_id, message, response, intent, confidence, platform, satisfaction_rating)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      business_id,
      customer_id,
      message,
      response,
      intent,
      confidence,
      platform,
      satisfaction_rating
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating interaction:', error);
      throw error;
    }
  }

  async findByBusiness(businessId, limit = 100, offset = 0) {
    const query = `
      SELECT i.*, c.phone_number, c.user_data->>'name' as customer_name
      FROM interactions i
      LEFT JOIN customers c ON i.customer_id = c.id
      WHERE i.business_id = $1
      ORDER BY i.timestamp DESC
      LIMIT $2 OFFSET $3
    `;

    try {
      const result = await pool.query(query, [businessId, limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error finding interactions by business:', error);
      throw error;
    }
  }

  async findByCustomer(customerId, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM interactions 
      WHERE customer_id = $1
      ORDER BY timestamp DESC
      LIMIT $2 OFFSET $3
    `;

    try {
      const result = await pool.query(query, [customerId, limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error finding interactions by customer:', error);
      throw error;
    }
  }

  async getIntentStats(businessId, startDate, endDate) {
    const query = `
      SELECT intent, COUNT(*) as count, AVG(confidence) as avg_confidence
      FROM interactions 
      WHERE business_id = $1 
      AND timestamp BETWEEN $2 AND $3
      GROUP BY intent
      ORDER BY count DESC
    `;

    try {
      const result = await pool.query(query, [businessId, startDate, endDate]);
      return result.rows;
    } catch (error) {
      console.error('Error getting intent stats:', error);
      throw error;
    }
  }

  async getSatisfactionStats(businessId, startDate, endDate) {
    const query = `
      SELECT 
        satisfaction_rating,
        COUNT(*) as count,
        (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM interactions WHERE business_id = $1 AND timestamp BETWEEN $2 AND $3)) as percentage
      FROM interactions 
      WHERE business_id = $1 
      AND timestamp BETWEEN $2 AND $3
      AND satisfaction_rating IS NOT NULL
      GROUP BY satisfaction_rating
      ORDER BY satisfaction_rating
    `;

    try {
      const result = await pool.query(query, [businessId, startDate, endDate]);
      return result.rows;
    } catch (error) {
      console.error('Error getting satisfaction stats:', error);
      throw error;
    }
  }

  async getDailyStats(businessId, days = 30) {
    const query = `
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as total_interactions,
        COUNT(DISTINCT customer_id) as unique_customers,
        AVG(confidence) as avg_confidence
      FROM interactions 
      WHERE business_id = $1 
      AND timestamp >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY DATE(timestamp)
      ORDER BY date DESC
    `;

    try {
      const result = await pool.query(query, [businessId]);
      return result.rows;
    } catch (error) {
      console.error('Error getting daily stats:', error);
      throw error;
    }
  }

  async getConversationTrend(businessId, period = '7days') {
    let dateFilter;
    switch (period) {
      case '7days':
        dateFilter = 'INTERVAL 7 DAYS';
        break;
      case '30days':
        dateFilter = 'INTERVAL 30 DAYS';
        break;
      default:
        dateFilter = 'INTERVAL 7 DAYS';
    }

    const query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as conversations,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as conversions
      FROM interactions 
      WHERE business_id = $1 
        AND created_at >= NOW() - ${dateFilter}
      GROUP BY DATE(created_at)
      ORDER BY date
    `;

    const result = await pool.query(query, [businessId]);
    return result.rows;
  }

  async getPlatformDistribution(businessId) {
    const query = `
      SELECT 
        platform,
        COUNT(*) as conversations,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as conversions
      FROM interactions 
      WHERE business_id = $1
      GROUP BY platform
    `;

    const result = await pool.query(query, [businessId]);
    return result.rows;
  }

  async getPerformanceMetrics(businessId) {
    const query = `
      SELECT 
        COUNT(*) as total_conversations,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as successful_conversations,
        AVG(CASE WHEN response_time IS NOT NULL THEN response_time END) as avg_response_time,
        COUNT(DISTINCT customer_id) as unique_customers
      FROM interactions 
      WHERE business_id = $1
    `;

    const result = await pool.query(query, [businessId]);
    return result.rows[0];
}

  async updateSatisfaction(interactionId, rating) {
    const query = `
      UPDATE interactions 
      SET satisfaction_rating = $1
      WHERE id = $2
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [rating, interactionId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating satisfaction rating:', error);
      throw error;
    }
  }

  async search(businessId, searchTerm, limit = 50, offset = 0) {
    const query = `
      SELECT i.*, c.phone_number, c.user_data->>'name' as customer_name
      FROM interactions i
      LEFT JOIN customers c ON i.customer_id = c.id
      WHERE i.business_id = $1
      AND (i.message ILIKE $2 OR i.response ILIKE $2 OR i.intent ILIKE $2)
      ORDER BY i.timestamp DESC
      LIMIT $3 OFFSET $4
    `;

    try {
      const result = await pool.query(query, [businessId, `%${searchTerm}%`, limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error searching interactions:', error);
      throw error;
    }
  }

  async countByBusiness(businessId) {
    const query = 'SELECT COUNT(*) FROM interactions WHERE business_id = $1';
    const result = await pool.query(query, [businessId]);
    return parseInt(result.rows[0].count);
  }

  async countByStatus(businessId, status) {
    const query = 'SELECT COUNT(*) FROM interactions WHERE business_id = $1 AND status = $2';
    const result = await pool.query(query, [businessId, status]);
    return parseInt(result.rows[0].count);
  }

  async findByBusiness(businessId, limit = 10) {
    const query = `
      SELECT 
        i.*, 
        c.phone_number as customer_phone,
        c.name as customer_name,
        p.name as product_name
      FROM interactions i 
      LEFT JOIN customers c ON i.customer_id = c.id 
      LEFT JOIN products p ON i.product_id = p.id
      WHERE i.business_id = $1 
      ORDER BY i.created_at DESC 
      LIMIT $2
    `;
    const result = await pool.query(query, [businessId, limit]);
    return result.rows;
  }

  async findAll(limit = 100, offset = 0) {
    const query = `
      SELECT i.*, c.phone_number, c.user_data->>'name' as customer_name, b.name as business_name
      FROM interactions i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN businesses b ON i.business_id = b.id
      ORDER BY i.timestamp DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      console.error('Error finding all interactions:', error);
      throw error;
    }
  }
}

module.exports = Interaction;