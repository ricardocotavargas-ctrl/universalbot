export const premiumStyles = {
  // Gradientes
  gradientPrimary: {
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
  },
  gradientPremium: {
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)'
  },
  
  // Sombras
  shadowLarge: {
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)'
  },
  shadowMedium: {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
  },
  
  // Efectos de vidrio
  glassEffect: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  
  // Tarjetas premium
  premiumCard: {
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)'
    }
  }
};