export const PLANS = {
  FREE: {
    name: 'Gratis',
    features: {
      whatsapp: false,
      facebook: false,
      instagram: false,
      analytics: false,
      autoResponses: 10,
      storage: '100MB'
    }
  },
  BASIC: {
    name: 'Básico',
    features: {
      whatsapp: true,
      facebook: false,
      instagram: false,
      analytics: true,
      autoResponses: 100,
      storage: '1GB'
    }
  },
  PROFESSIONAL: {
    name: 'Professional',
    features: {
      whatsapp: true,
      facebook: true,
      instagram: true,
      analytics: true,
      autoResponses: 1000,
      storage: '10GB'
    }
  }
};

export const checkFeatureAccess = (business, feature) => {
  const plan = business?.plan || 'FREE';
  return PLANS[plan]?.features[feature] || false;
};