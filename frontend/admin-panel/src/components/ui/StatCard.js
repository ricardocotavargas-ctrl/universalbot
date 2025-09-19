import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Skeleton
} from '@mui/material';

const StatCard = ({ title, value, change, icon, color = 'primary', loading = false }) => {
  return (
    <Card sx={{ 
      height: '100%',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 3
      }
    }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box flex={1}>
            <Typography color="textSecondary" variant="body2" fontWeight={500} gutterBottom>
              {title}
            </Typography>
            
            {loading ? (
              <Skeleton variant="text" width={100} height={40} />
            ) : (
              <Typography variant="h3" component="div" color={`${color}.main`} fontWeight={700}>
                {value}
              </Typography>
            )}
          </Box>
          
          <Box
            sx={{
              p: 1.5,
              borderRadius: 3,
              bgcolor: `${color}.50`,
              color: `${color}.600`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '24px' }}>{icon}</span>
          </Box>
        </Box>

        {change && !loading && (
          <Chip
            label={change}
            size="small"
            color={change.includes('+') ? 'success' : 'error'}
            sx={{ 
              mt: 1,
              fontWeight: 600,
              backgroundColor: change.includes('+') ? 'success.50' : 'error.50',
              color: change.includes('+') ? 'success.700' : 'error.700'
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;