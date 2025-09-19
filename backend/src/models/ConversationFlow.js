const { pool } = require('../core/database');

class ConversationFlow {
  async create(flowData) {
    const { tenant_id, name, industry, triggers, steps, fallback_message } = flowData;
    
    const query = `
      INSERT INTO conversation_flows 
      (tenant_id, name, industry, triggers, steps, fallback_message, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      tenant_id, name, industry, 
      JSON.stringify(triggers || []), 
      JSON.stringify(steps || []),
      fallback_message,
      true
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByIndustry(tenantId, industry) {
    const query = `
      SELECT * FROM conversation_flows 
      WHERE tenant_id = $1 AND industry = $2 AND is_active = true
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [tenantId, industry]);
    return result.rows;
  }

  async update(flowId, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (['triggers', 'steps'].includes(key)) {
        fields.push(`${key} = $${paramCount}`);
        values.push(JSON.stringify(updates[key]));
      } else {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
      }
      paramCount++;
    });

    values.push(flowId);
    const query = `UPDATE conversation_flows SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = ConversationFlow;