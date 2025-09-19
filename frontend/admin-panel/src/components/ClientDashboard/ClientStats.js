import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { WhatsApp, Facebook, ChatBubble, TrendingUp } from '@mui/icons-material';

const ClientStats = ({ business }) => {
  const stats = [
    { icon: WhatsApp, label: 'Mensajes WhatsApp', value: '1,234', color: '#25D366' },
    { icon: Facebook, label: 'Interacciones FB', value: '567', color: '#1877F2' },
    { icon: ChatBubble, label: 'Tasa Respuesta', value: '89%', color: '#6366F1' },
    { icon: TrendingUp, label: 'Conversiones', value: '45', color: '#10B981' }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <stat.icon sx={{ color: stat.color, fontSize: 32, mr: 1 }} />
                <Typography variant="h4" component="div" color={stat.color}>
                  {stat.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {stat.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ClientStats;