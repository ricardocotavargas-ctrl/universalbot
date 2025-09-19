import React from 'react';
import { Button } from '@mui/material';

const GradientButton = ({ 
  children, 
  gradient = 'primary',
  sx = {}, 
  ...props 
}) => {
  const gradients = {
    primary: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    error: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)'
  };

  return (
    <Button
      sx={{
        background: gradients[gradient],
        color: 'white',
        fontWeight: 600,
        borderRadius: 8,
        padding: '10px 24px',
        textTransform: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;