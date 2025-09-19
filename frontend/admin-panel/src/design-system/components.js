import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Skeleton
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  ChatBubble
} from '@mui/icons-material';

export const StatCard = ({ icon, title, value, change, loading = false, color = 'primary' }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box>
          <Typography color="textSecondary" variant="body2" fontWeight={500}>
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
            bgcolor: `${color}.light`,
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
      </Box>
      {change && (
        <Chip
          label={change}
          size="small"
          color={change.includes('+') ? 'success' : 'error'}
          sx={{ fontWeight: 600 }}
        />
      )}
    </CardContent>
  </Card>
);

export const MetricCard = ({ title, value, icon, trend, loading = false }) => (
  <Card sx={{ p: 2 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="body2" color="textSecondary" fontWeight={500}>
          {title}
        </Typography>
        {loading ? (
          <Skeleton variant="text" width={80} height={30} />
        ) : (
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
        )}
      </Box>
      <Box color="primary.main">{icon}</Box>
    </Box>
    {trend && (
      <Typography variant="caption" color={trend.includes('+') ? 'success.main' : 'error.main'}>
        {trend} vs último mes
      </Typography>
    )}
  </Card>
);