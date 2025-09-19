-- Migration script for Universal Bot Platform
-- Run this after initial setup to add new features

-- Add support for multiple languages
ALTER TABLE businesses ADD COLUMN default_language VARCHAR(10) DEFAULT 'es';
ALTER TABLE customers ADD COLUMN preferred_language VARCHAR(10);

-- Add support for message templates
CREATE TABLE message_templates (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add support for scheduled messages
CREATE TABLE scheduled_messages (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_scheduled_messages_status ON scheduled_messages(status);
CREATE INDEX idx_scheduled_messages_scheduled_for ON scheduled_messages(scheduled_for);
CREATE INDEX idx_message_templates_business_status ON message_templates(business_id, status);

-- Add support for message reactions
ALTER TABLE messages ADD COLUMN reaction VARCHAR(50);
ALTER TABLE messages ADD COLUMN sentiment_score FLOAT;

-- Add support for conversation tags
CREATE TABLE conversation_tags (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversation_tags_tag ON conversation_tags(tag);

-- Add support for business analytics
CREATE TABLE business_analytics (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    metric VARCHAR(100) NOT NULL,
    value INTEGER NOT NULL,
    dimension VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(business_id, date, metric, dimension)
);

-- Insert default message templates
INSERT INTO message_templates (business_id, name, content, category, variables) VALUES
(1, 'welcome_message', '¡Hola {{customer_name}}! 👋 Bienvenido a {{business_name}}. ¿En qué puedo ayudarte hoy?', 'greeting', '["customer_name", "business_name"]'),
(1, 'order_confirmation', '✅ Tu pedido #{{order_number}} ha sido confirmado. Total: ${{order_amount}}', 'transaction', '["order_number", "order_amount"]'),
(2, 'appointment_reminder', '⏰ Recordatorio: Tienes una cita el {{appointment_date}} a las {{appointment_time}}', 'reminder', '["appointment_date", "appointment_time"]');

-- Update function to handle new columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for new tables
CREATE TRIGGER update_message_templates_updated_at BEFORE UPDATE ON message_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add sample data for testing
INSERT INTO business_analytics (business_id, date, metric, value, dimension) VALUES
(1, CURRENT_DATE, 'total_messages', 150, NULL),
(1, CURRENT_DATE, 'new_customers', 25, NULL),
(1, CURRENT_DATE, 'completed_orders', 18, NULL),
(2, CURRENT_DATE, 'scheduled_appointments', 12, NULL);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO universal_bot_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO universal_bot_user;

COMMENT ON DATABASE universal_bot_db IS 'Universal Bot Platform Database - Production';