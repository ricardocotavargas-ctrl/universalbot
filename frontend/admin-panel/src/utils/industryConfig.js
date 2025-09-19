export const industries = [
  { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { value: 'healthcare', label: 'Salud', icon: '🏥' },
  { value: 'education', label: 'Educación', icon: '🎓' },
  { value: 'restaurant', label: 'Restaurante', icon: '🍽️' },
  { value: 'realestate', label: 'Bienes Raíces', icon: '🏠' },
  { value: 'services', label: 'Servicios', icon: '🔧' },
  { value: 'other', label: 'Otro', icon: '🏢' }
];

export const industryConfigs = {
  ecommerce: {
    description: 'Configuración optimizada para tiendas online',
    features: ['Catálogo de productos', 'Carrito de compras', 'Pasarelas de pago', 'Seguimiento de envíos', 'Cupones de descuento'],
    modules: { ecommerce: true, appointments: false, courses: false },
    flow: 'Flujo de ventas ecommerce'
  },
  healthcare: {
    description: 'Configuración para clínicas y centros de salud',
    features: ['Agendamiento de citas', 'Historial médico', 'Recordatorios de citas', 'Prescripciones digitales', 'Telemedicina'],
    modules: { ecommerce: false, appointments: true, courses: false },
    flow: 'Flujo de salud'
  },
  education: {
    description: 'Configuración para instituciones educativas',
    features: ['Gestión de cursos', 'Inscripciones en línea', 'Material educativo', 'Calificaciones', 'Certificados digitales'],
    modules: { ecommerce: false, appointments: false, courses: true },
    flow: 'Flujo educativo'
  },
  restaurant: {
    description: 'Configuración para restaurantes y food delivery',
    features: ['Menú digital', 'Pedidos en línea', 'Reservas de mesas', 'Delivery tracking', 'Reseñas'],
    modules: { ecommerce: true, appointments: true, courses: false },
    flow: 'Flujo restaurante'
  },
  realestate: {
    description: 'Configuración para bienes raíces',
    features: ['Listado de propiedades', 'Agendamiento de visitas', 'Documentos digitales', 'Tours virtuales', 'Contratos'],
    modules: { ecommerce: false, appointments: true, courses: false },
    flow: 'Flujo inmobiliario'
  },
  services: {
    description: 'Configuración para servicios generales',
    features: ['Catálogo de servicios', 'Agendamiento de citas', 'Presupuestos', 'Facturación', 'Seguimiento de proyectos'],
    modules: { ecommerce: true, appointments: true, courses: false },
    flow: 'Flujo de servicios'
  },
  other: {
    description: 'Configuración general para negocios diversos',
    features: ['Comunicación con clientes', 'Gestión básica', 'Notificaciones', 'Reportes básicos'],
    modules: { ecommerce: false, appointments: false, courses: false },
    flow: 'Flujo general'
  }
};

export const getIndustryIcon = (industry) => {
  const icons = {
    ecommerce: '🛒',
    healthcare: '🏥',
    education: '🎓',
    restaurant: '🍽️',
    realestate: '🏠',
    services: '🔧',
    other: '🏢'
  };
  return icons[industry] || '🏢';
};