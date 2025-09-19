import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Switch,
  FormControlLabel, Slider
} from '@mui/material';
import {
  People, Category, TrendingUp, Add, FilterList, Analytics
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const ClientSegmentation = () => {
  const [segments, setSegments] = useState([]);
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const mockSegments = [
    { id: 1, name: 'Clientes Premium', criteria: 'Compra > $500', clientCount: 45, value: 125000 },
    { id: 2, name: 'Clientes Frecuentes', criteria: 'Visitas > 5/mes', clientCount: 120, value: 89000 },
    { id: 3, name: 'Clientes Inactivos', criteria: 'Sin compra > 30 días', clientCount: 85, value: 15000 },
    { id: 4, name: 'Nuevos Clientes', criteria: 'Primera compra < 7 días', clientCount: 30, value: 42000 }
  ];

  const mockClients = [
    { id: 1, name: 'María González', segment: 'Clientes Premium', totalSpent: 1250, lastPurchase: '2024-05-20', frequency: 12 },
    { id: 2, name: 'Carlos Rodríguez', segment: 'Clientes Frecuentes', totalSpent: 850, lastPurchase: '2024-05-18', frequency: 8 },
    { id: 3, name: 'Ana Martínez', segment: 'Clientes Premium', totalSpent: 2100, lastPurchase: '2024-05-15', frequency: 15 },
    { id: 4, name: 'Juan López', segment: 'Nuevos Clientes', totalSpent: 350, lastPurchase: '2024-05-22', frequency: 1 }
  ];

  useEffect(() => {
    setSegments(mockSegments);
    setClients(mockClients);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  const getSegmentColor = (segmentName) => {
    const colors = {
      'Clientes Premium': 'primary',
      'Clientes Frecuentes': 'success',
      'Clientes Inactivos': 'error',
      'Nuevos Clientes': 'warning'
    };
    return colors[segmentName] || 'default';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Segmentación de Clientes
        </Typography>
        <Typography color="text.secondary">
          Agrupa y analiza tus clientes por comportamiento y valor
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {segments.map((segment) => (
          <Grid item xs={12} md={3} key={segment.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Category sx={{ mr: 1, color: `${getSegmentColor(segment.name)}.main` }} />
                  <Typography variant="h6">{segment.name}</Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {segment.criteria}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    👥 {segment.clientCount} clientes
                  </Typography>
                  <Typography variant="body2">
                    💰 {formatCurrency(segment.value)} en valor
                  </Typography>
                </Box>
                
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ mt: 2 }}
                  onClick={() => setOpenDialog(true)}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Segmento</InputLabel>
            <Select label="Segmento">
              <MenuItem value="all">Todos los segmentos</MenuItem>
              {segments.map(segment => (
                <MenuItem key={segment.id} value={segment.id}>
                  {segment.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            placeholder="Buscar clientes..."
            sx={{ minWidth: 250 }}
          />
          
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nuevo Segmento
          </Button>
          
          <Button variant="outlined" startIcon={<Analytics />}>
            Análisis Avanzado
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Clientes por Segmento
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Segmento</TableCell>
                <TableCell align="right">Total Gastado</TableCell>
                <TableCell align="center">Última Compra</TableCell>
                <TableCell align="center">Frecuencia</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Typography fontWeight="medium">{client.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={client.segment}
                      color={getSegmentColor(client.segment)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(client.totalSpent)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(client.lastPurchase)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${client.frequency} compras`}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={client.totalSpent > 1000 ? 'Alto' : client.totalSpent > 500 ? 'Medio' : 'Bajo'}
                      color={client.totalSpent > 1000 ? 'success' : client.totalSpent > 500 ? 'warning' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button size="small" variant="outlined">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Estadísticas de Segmentación */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribución por Segmento
              </Typography>
              <Box sx={{ mt: 2 }}>
                {segments.map((segment) => (
                  <Box key={segment.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {segment.name}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {segment.clientCount} clientes ({Math.round((segment.clientCount / segments.reduce((sum, s) => sum + s.clientCount, 0)) * 100)}%)
                      </Typography>
                    </Box>
                    <Slider
                      value={(segment.clientCount / segments.reduce((sum, s) => sum + s.clientCount, 0)) * 100}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value.toFixed(1)}%`}
                      color={getSegmentColor(segment.name)}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Valor por Segmento
              </Typography>
              <Box sx={{ mt: 2 }}>
                {segments.map((segment) => {
                  const totalValue = segments.reduce((sum, s) => sum + s.value, 0);
                  const percentage = (segment.value / totalValue) * 100;
                  
                  return (
                    <Box key={segment.id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          {segment.name}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(segment.value)} ({percentage.toFixed(1)}%)
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        height: 8, 
                        bgcolor: `${getSegmentColor(segment.name)}.light`,
                        borderRadius: 4,
                        width: `${percentage}%`
                      }} />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Diálogo para nuevo segmento */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Crear Nuevo Segmento</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nombre del Segmento" />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Criterios de Segmentación" 
                multiline
                rows={3}
                placeholder="Ej: Total gastado > $500 AND Última compra < 30 días"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch />}
                label="Segmento Activo"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch />}
                label="Actualización Automática"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                placeholder="Descripción del segmento y su propósito..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Crear Segmento
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientSegmentation;