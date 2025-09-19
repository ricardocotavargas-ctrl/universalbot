import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const UBCard = ({ 
  title, 
  subtitle, 
  children, 
  action,
  sx = {} 
}) => {
  return (
    <Card sx={{ borderRadius: 8, ...sx }}>
      <CardContent sx={{ p: 3 }}>
        {(title || subtitle) && (
          <Box sx={{ mb: 3 }}>
            {title && (
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
        {action && (
          <Box sx={{ mt: 3 }}>
            {action}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UBCard;