import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const PremiumCard = ({ 
  children, 
  title, 
  subtitle, 
  icon, 
  action,
  sx = {} 
}) => {
  return (
    <Card
      sx={{
        borderRadius: 16,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        },
        ...sx
      }}
    >
      <CardContent>
        {(title || icon) && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: title ? 2 : 0
          }}>
            <Box>
              {title && (
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {icon && (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {icon}
              </Box>
            )}
          </Box>
        )}
        {children}
        {action && (
          <Box sx={{ mt: 2 }}>
            {action}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PremiumCard;