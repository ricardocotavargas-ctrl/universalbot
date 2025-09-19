const { pool } = require('../core/database');

class Product {
  async create(productData) {
    const {
      business_id,
      name,
      description,
      price,
      currency = 'USD',
      sku,
      stock_quantity,
      category,
      images = [],
      attributes = {},
      status = 'active'
    } = productData;

    const query = `
      INSERT INTO products 
        (business_id, name, description, price, currency, sku, stock_quantity, category, images, attributes, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const values = [
      business_id,
      name,
      description,
      price,
      currency,
      sku,
      stock_quantity,
      category,
      JSON.stringify(images),
      JSON.stringify(attributes),
      status
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async findByBusiness(businessId, category = null, limit = 100, offset = 0) {
    let query = `SELECT * FROM products WHERE business_id = $1 AND status = 'active'`;
    let values = [businessId];
    let paramCount = 1;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      values.push(category);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(limit, offset);

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error finding products by business:', error);
      throw error;
    }
  }

  async searchProducts(businessId, searchTerm, category = null, limit = 50) {
      let query = `
        SELECT * FROM products 
        WHERE business_id = $1 
          AND status = 'active'
          AND (
            name ILIKE $2 
            OR description ILIKE $2 
            OR category ILIKE $2
            OR attributes::text ILIKE $2
          )
      `;
      let values = [businessId, `%${searchTerm}%`];

      if (category) {
          values.push(category);
          query += ` AND category = $${values.length}`;
      }

      query += ` ORDER BY name LIMIT $${values.length + 1}`;
      values.push(limit);

      try {
          const result = await pool.query(query, values);
          return result.rows;
      } catch (error) {
          console.error('Error searching products:', error);
          throw error;
      }
  }

  async findById(productId, businessId = null) {
    let query = `SELECT * FROM products WHERE id = $1`;
    let values = [productId];

    if (businessId) {
      query += ` AND business_id = $2`;
      values.push(businessId);
    }

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding product by ID:', error);
      throw error;
    }
  }

  async updateStock(productId, quantityChange) {
    const query = `
      UPDATE products 
      SET stock_quantity = stock_quantity + $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [productId, quantityChange]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  }

  async delete(productId, businessId) {
    const query = `
      UPDATE products 
      SET status = 'deleted', updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 AND business_id = $2 
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [productId, businessId]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

module.exports = Product;