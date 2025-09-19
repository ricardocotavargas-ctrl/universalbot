const { pool } = require('../core/database');

class MessageLogService {
  async logMessage(messageData) {
    const {
      business_id,
      customer_id,
      direction,
      platform,
      message_type = 'text',
      content,
      status = 'delivered',
      message_id = null
    } = messageData;

    const query = `
      INSERT INTO message_logs 
        (business_id, customer_id, direction, platform, message_type, content, status, message_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      business_id,
      customer_id,
      direction,
      platform,
      message_type,
      content,
      status,
      message_id
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error logging message:', error);
      // No lances el error para no romper el flujo principal por un log fallido
    }
  }

  async getConversation(businessId, customerId, limit = 50) {
    const query = `
      SELECT * FROM message_logs 
      WHERE business_id = $1 AND customer_id = $2 
      ORDER BY created_at DESC 
      LIMIT $3
    `;

    try {
      const result = await pool.query(query, [businessId, customerId, limit]);
      return result.rows.reverse(); // Ordenar de más antiguo a más nuevo
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  }

  async getBusinessStats(businessId, days = 30) {
    const query = `
      SELECT 
        platform,
        direction,
        status,
        COUNT(*) as message_count,
        DATE(created_at) as date
      FROM message_logs 
      WHERE business_id = $1 AND created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY platform, direction, status, DATE(created_at)
      ORDER BY date DESC
    `;

    try {
      const result = await pool.query(query, [businessId]);
      return result.rows;
    } catch (error) {
      console.error('Error getting business stats:', error);
      throw error;
    }
  }
}

module.exports = new MessageLogService(); // Exportamos una instancia singleton