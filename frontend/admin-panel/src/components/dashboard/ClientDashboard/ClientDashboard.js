import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Tabs,
  Tab,
  Chip,
  IconButton
} from '@mui/material';
import {
  Refresh,
  Download,
  Visibility,
  WhatsApp,
  Email,
  Facebook,
  Instagram,
  TrendingUp,
  People,
  AttachMoney,
  ChatBubble
} from '@mui/icons-material';
import { api } from '../../../utils/api';
import { professionalTheme } from '../../../design-system/theme';
import { StatCard, MetricCard } from '../../../design-system/components';

const ClientDashboard = ({ business }) => {
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({});
  const [interactions, setInteractions] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (business) {
      loadDashboardData();
    }
  }, [business]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, interactionsData, analyticsData] = await Promise.all([
        api.get(`/api/business/${business.id}/stats`),
        api.get(`/api/business/${business.id}/interactions?limit=5`),
        api.get(`/api/business/${business.id}/analytics?period=7days`)
      ]);

      setStats(statsData.data || {});
      setInteractions(interactionsData.data || []);
      setAnalyticsData(analyticsData.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      {/* Header Ejecutivo */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h1" gutterBottom>
              📊 Panel Ejecutivo
            </Typography>
            <Typography variant="h4" color="textSecondary" fontWeight={400}>
              {business?.name} • Resumen de rendimiento
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={loadDashboardData}
            size="large"
          >
            Actualizar Datos
          </Button>
        </Box>
      </Box>

      {/* Stats Grid Mejorado */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ChatBubble sx={{ fontSize: 28 }} />}
            title="Conversaciones Totales"
            value={stats.totalConversations?.toLocaleString() || '0'}
            change={stats.monthlyGrowth || '+0%'}
            loading={loading}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<People sx={{ fontSize: 28 }} />}
            title="Clientes Activos"
            value={stats.totalCustomers?.toLocaleString() || '0'}
            change="+12%"
            loading={loading}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoney sx={{ fontSize: 28 }} />}
            title="Tasa Conversión"
            value={stats.conversionRate || '0%'}
            change="+5.2%"
            loading={loading}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUp sx={{ fontSize: 28 }} />}
            title="Crecimiento Mensual"
            value={stats.growthRate || '+0%'}
            change="+18%"
            loading={loading}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Dashboard Content */}
      <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Resumen Ejecutivo" />
            <Tab label="Analytics Avanzado" />
            <Tab label="Interacciones" />
            <Tab label="Reportes" />
          </Tabs>
        </Box>

        {/* Contenido de pestañas... */}
      </Paper>
    </Container>
  );
};

export default ClientDashboard;