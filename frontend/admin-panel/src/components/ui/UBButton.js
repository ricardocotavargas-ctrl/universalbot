import React from 'react';
import { Button } from '@mui/material';

const UBButton = ({ 
  children, 
  variant = 'contained', 
  size = 'medium', 
  loading = false,
  startIcon,
  endIcon,
  onClick,
  sx = {},
  ...props 
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: 6,
      fontWeight: 600,
      textTransform: 'none',
      transition: 'all 0.2s ease',
    };

    const sizeStyles = {
      small: { padding: '6px 16px', fontSize: '0.8125rem' },
      medium: { padding: '8px 20px', fontSize: '0.875rem' },
      large: { padding: '10px 24px', fontSize: '1rem' },
    };

    return { ...baseStyles, ...sizeStyles[size], ...sx };
  };

  return (
    <Button
      variant={variant}
      disabled={loading}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      onClick={onClick}
      sx={getButtonStyles()}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </Button>
  );
};

export default UBButton;