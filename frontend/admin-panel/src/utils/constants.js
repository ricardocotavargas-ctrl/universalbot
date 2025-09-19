export const INDUSTRIES = [
  { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { value: 'healthcare', label: 'Salud', icon: '🏥' },
  { value: 'education', label: 'Educación', icon: '🎓' },
  { value: 'restaurant', label: 'Restaurante', icon: '🍽️' },
  { value: 'realestate', label: 'Bienes Raíces', icon: '🏠' },
  { value: 'services', label: 'Servicios', icon: '🔧' },
  { value: 'other', label: 'Otro', icon: '🏢' }
];

export const MESSAGE_TEMPLATES = [
  "¡Hola! 👋 ¿En qué puedo ayudarte hoy?",
  "✅ Pedido confirmado. Tu número de orden es: #",
  "📅 Tu cita ha sido agendada para:",
  "📦 Tu pedido está en camino. Número de seguimiento:",
  "💳 ¿Te gustaría proceder con el pago?",
  "⭐ ¡Gracias por tu compra! Califica nuestro servicio:",
  "🔄 Tu pedido está siendo procesado",
  "📋 Aquí está el resumen de tu compra",
  "🎉 ¡Oferta especial solo para ti!",
  "❓ ¿Necesitas ayuda con algo más?"
];

export const STATUS_COLORS = {
  active: 'success',
  pending: 'warning',
  processing: 'info',
  completed: 'success',
  cancelled: 'error',
  new: 'primary',
  converted: 'success',
  inactive: 'default'
};

export const INDUSTRY_COLORS = {
  ecommerce: 'primary',
  healthcare: 'error',
  education: 'warning',
  restaurant: 'success',
  realestate: 'info',
  services: 'secondary',
  other: 'default'
};