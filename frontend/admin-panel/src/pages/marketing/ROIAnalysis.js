import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  TrendingUp, TrendingDown, Analytics, ShowChart, Campaign, AttachMoney
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const ROIAnalysis = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const mockCampaigns = [
    { id: 1, name: 'Campaña Email Mayo', channel: 'Email', investment: 500, revenue: 3500, period: 'May 2024', roi: 600 },
    { id: 2, name: 'Redes Sociales Q2', channel: 'Social Media', investment: 800, revenue: 4200, period: 'Abr-Jun 2024', roi: 425 },
    { id: 3, name: 'Google Ads Verano', channel: 'PPC', investment: 1200, revenue: 6800, period: 'Jun-Ago 2024', roi: 467 },
    { id: 4, name: 'WhatsApp Promo', channel: 'Messaging', investment: 300, revenue: 1500, period: 'May 2024', roi: 400 }
  ];

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const calculateROI = (investment, revenue) => {
    return ((revenue - investment) / investment) * 100;
  };

  const getROIColor = (roi) => {
    if (roi >= 500) return 'success';
    if (roi >= 300) return 'warning';
    return 'error';
  };

  const getROIRating = (roi) => {
    if (roi >= 500) return 'Excelente';
    if (roi >= 300) return 'Bueno';
    if (roi >= 100) return 'Aceptable';
    return 'Pobre';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Análisis de ROI
        </Typography>
        <Typography color="text.secondary">
          Retorno de inversión de tus campañas de marketing
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Inversión Total
              </Typography>
              <Typography variant="h4">
                {formatCurrency(campaigns.reduce((sum, c) => sum + c.investment, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Ingresos Generados
              </Typography>
              <Typography variant="h4" color="success.main">
                {formatCurrency(campaigns.reduce((sum, c) => sum + c.revenue, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                ROI Promedio
              </Typography>
              <Typography variant="h4">
                {formatPercentage(Math.round(campaigns.reduce((sum, c) => sum + calculateROI(c.investment, c.revenue), 0) / campaigns.length))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Campañas Activas
              </Typography>
              <Typography variant="h4">
                {campaigns.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Canal</InputLabel>
            <Select label="Canal">
              <MenuItem value="all">Todos los canales</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Social Media">Redes Sociales</MenuItem>
              <MenuItem value="PPC">PPC</MenuItem>
              <MenuItem value="Messaging">Mensajería</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Período"
            sx={{ minWidth: 150 }}
          />
          
          <Button variant="contained" startIcon={<Analytics />} onClick={() => setOpenDialog(true)}>
            Nueva Análisis
          </Button>
          
          <Button variant="outlined" startIcon={<ShowChart />}>
            Reporte Detallado
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Desempeño de Campañas
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campaña</TableCell>
                <TableCell>Canal</TableCell>
                <TableCell>Período</TableCell>
                <TableCell align="right">Inversión</TableCell>
                <TableCell align="right">Ingresos</TableCell>
                <TableCell align="right">ROI</TableCell>
                <TableCell align="center">Evaluación</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => {
                const roi = calculateROI(campaign.investment, campaign.revenue);
                const roiColor = getROIColor(roi);
                
                return (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <Typography fontWeight="medium">{campaign.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={campaign.channel} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{campaign.period}</TableCell>
                    <TableCell align="right">{formatCurrency(campaign.investment)}</TableCell>
                    <TableCell align="right">
                      <Typography color="success.main" fontWeight="bold">
                        {formatCurrency(campaign.revenue)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {roi >= 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                        <Typography color={roiColor} fontWeight="bold" sx={{ ml: 1 }}>
                          {formatPercentage(Math.round(roi))}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getROIRating(roi)}
                        color={roiColor}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined">
                        Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Análisis por Canal */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ROI por Canal
              </Typography>
              <Box sx={{ mt: 2 }}>
                {Object.entries(
                  campaigns.reduce((acc, campaign) => {
                    if (!acc[campaign.channel]) {
                      acc[campaign.channel] = { totalInvestment: 0, totalRevenue: 0, count: 0 };
                    }
                    acc[campaign.channel].totalInvestment += campaign.investment;
                    acc[campaign.channel].totalRevenue += campaign.revenue;
                    acc[campaign.channel].count += 1;
                    return acc;
                  }, {})
                ).map(([channel, data]) => {
                  const roi = calculateROI(data.totalInvestment, data.totalRevenue);
                  
                  return (
                    <Box key={channel} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{channel}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatPercentage(Math.round(roi))}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(roi / 10, 100)}
                        color={getROIColor(roi)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Eficiencia por Canal
              </Typography>
              <Box sx={{ mt: 2 }}>
                {Object.entries(
                  campaigns.reduce((acc, campaign) => {
                    if (!acc[campaign.channel]) {
                      acc[campaign.channel] = { investment: 0, revenue: 0 };
                    }
                    acc[campaign.channel].investment += campaign.investment;
                    acc[campaign.channel].revenue += campaign.revenue;
                    return acc;
                  }, {})
                ).map(([channel, data]) => (
                  <Box key={channel} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {channel}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Inversión:</Typography>
                      <Typography variant="body2">{formatCurrency(data.investment)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Ingresos:</Typography>
                      <Typography variant="body2" color="success.main">
                        {formatCurrency(data.revenue)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">ROI:</Typography>
                      <Typography 
                        variant="body2" 
                        color={getROIColor(calculateROI(data.investment, data.revenue))}
                        fontWeight="bold"
                      >
                        {formatPercentage(Math.round(calculateROI(data.investment, data.revenue)))}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Diálogo para nuevo análisis */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Nuevo Análisis de ROI</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nombre de la Campaña" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Canal</InputLabel>
                <Select label="Canal">
                  <MenuItem value="Email">Email Marketing</MenuItem>
                  <MenuItem value="Social Media">Redes Sociales</MenuItem>
                  <MenuItem value="PPC">Publicidad PPC</MenuItem>
                  <MenuItem value="Messaging">Mensajería</MenuItem>
                  <MenuItem value="Other">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Período de la Campaña" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Inversión Total"
                type="number"
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ingresos Generados"
                type="number"
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Métricas Adicionales"
                multiline
                rows={3}
                placeholder="Conversiones, CTR, Costo por Adquisición, etc."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Calcular ROI
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ROIAnalysis;