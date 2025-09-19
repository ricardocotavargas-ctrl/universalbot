const { pool } = require('../core/database');

class MessageTemplate {
  async create(templateData) {
    const { tenant_id, name, category, content, variables, industry, language } = templateData;
    
    const query = `
      INSERT INTO message_templates 
      (tenant_id, name, category, content, variables, industry, language, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING *
    `;

    const values = [
      tenant_id, name, category, content, 
      JSON.stringify(variables || []), 
      industry, language || 'es'
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByTenant(tenantId, category = null) {
    let query = `SELECT * FROM message_templates WHERE tenant_id = $1 AND status = 'approved'`;
    let values = [tenantId];
    
    if (category) {
      query += ` AND category = $2`;
      values.push(category);
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);
    return result.rows;
  }

  async updateStatus(templateId, status, rejectionReason = null) {
    const query = `
      UPDATE message_templates 
      SET status = $1, rejection_reason = $2, reviewed_at = CURRENT_TIMESTAMP
      WHERE id = $3 
      RETURNING *
    `;

    const result = await pool.query(query, [status, rejectionReason, templateId]);
    return result.rows[0];
  }

  async delete(templateId, tenantId) {
    const query = `DELETE FROM message_templates WHERE id = $1 AND tenant_id = $2 RETURNING *`;
    const result = await pool.query(query, [templateId, tenantId]);
    return result.rows[0];
  }
}

module.exports = MessageTemplate;