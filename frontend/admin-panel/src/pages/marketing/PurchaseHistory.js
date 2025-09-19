import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Avatar, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Tabs, Tab
} from '@mui/material';
import {
  History, ShoppingCart, Person, TrendingUp, Download, FilterList
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClient, setSelectedClient] = useState('all');

  const mockPurchases = [
    { id: 1, client: 'María González', date: '2024-05-20', amount: 125, items: 3, status: 'completed', method: 'Tarjeta' },
    { id: 2, client: 'Carlos Rodríguez', date: '2024-05-19', amount: 85, items: 2, status: 'completed', method: 'Efectivo' },
    { id: 3, client: 'Ana Martínez', date: '2024-05-18', amount: 210, items: 5, status: 'completed', method: 'Transferencia' },
    { id: 4, client: 'Juan López', date: '2024-05-17', amount: 35, items: 1, status: 'cancelled', method: 'Tarjeta' },
    { id: 5, client: 'María González', date: '2024-05-16', amount: 75, items: 2, status: 'completed', method: 'Efectivo' }
  ];

  const mockClients = [
    { id: 1, name: 'María González', totalPurchases: 12, totalSpent: 1250, lastPurchase: '2024-05-20' },
    { id: 2, name: 'Carlos Rodríguez', totalPurchases: 8, totalSpent: 850, lastPurchase: '2024-05-19' },
    { id: 3, name: 'Ana Martínez', totalPurchases: 15, totalSpent: 2100, lastPurchase: '2024-05-18' },
    { id: 4, name: 'Juan López', totalPurchases: 1, totalSpent: 35, lastPurchase: '2024-05-17' }
  ];

  useEffect(() => {
    setPurchases(mockPurchases);
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

  const getStatusColor = (status) => {
    return status === 'completed' ? 'success' : 'error';
  };

  const getStatusText = (status) => {
    return status === 'completed' ? 'Completado' : 'Cancelado';
  };

  const filteredPurchases = selectedClient === 'all' 
    ? purchases 
    : purchases.filter(p => p.client === selectedClient);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Historial de Compras
        </Typography>
        <Typography color="text.secondary">
          Registro completo de todas las transacciones de clientes
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Compras
              </Typography>
              <Typography variant="h4">{purchases.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Valor Total
              </Typography>
              <Typography variant="h4">
                {formatCurrency(purchases.reduce((sum, p) => sum + p.amount, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completadas
              </Typography>
              <Typography variant="h4" color="success.main">
                {purchases.filter(p => p.status === 'completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Clientes Únicos
              </Typography>
              <Typography variant="h4">
                {new Set(purchases.map(p => p.client)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Cliente</InputLabel>
            <Select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              label="Filtrar por Cliente"
            >
              <MenuItem value="all">Todos los clientes</MenuItem>
              {clients.map(client => (
                <MenuItem key={client.id} value={client.name}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Fecha desde"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          
          <TextField
            label="Fecha hasta"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          
          <Button variant="outlined" startIcon={<Download />}>
            Exportar Historial
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<History />} label="Todas las Compras" />
            <Tab icon={<ShoppingCart />} label="Resumen por Cliente" />
            <Tab icon={<TrendingUp />} label="Tendencias" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell align="center">Items</TableCell>
                  <TableCell align="center">Método de Pago</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                          {purchase.client.charAt(0)}
                        </Avatar>
                        {purchase.client}
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(purchase.date)}</TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold">
                        {formatCurrency(purchase.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{purchase.items}</TableCell>
                    <TableCell align="center">
                      <Chip label={purchase.method} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getStatusText(purchase.status)}
                        color={getStatusColor(purchase.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined">
                        Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeTab === 1 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell align="center">Total Compras</TableCell>
                  <TableCell align="right">Total Gastado</TableCell>
                  <TableCell align="center">Última Compra</TableCell>
                  <TableCell align="center">Valor Promedio</TableCell>
                  <TableCell align="center">Fidelidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                          {client.name.charAt(0)}
                        </Avatar>
                        {client.name}
                      </Box>
                    </TableCell>
                    <TableCell align="center">{client.totalPurchases}</TableCell>
                    <TableCell align="right">{formatCurrency(client.totalSpent)}</TableCell>
                    <TableCell align="center">{formatDate(client.lastPurchase)}</TableCell>
                    <TableCell align="center">
                      {formatCurrency(client.totalSpent / client.totalPurchases)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={client.totalPurchases > 10 ? 'Alta' : client.totalPurchases > 5 ? 'Media' : 'Baja'}
                        color={client.totalPurchases > 10 ? 'success' : client.totalPurchases > 5 ? 'warning' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </UBCard>

      {/* Estadísticas Adicionales */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribución por Método de Pago
              </Typography>
              <Box sx={{ mt: 2 }}>
                {Object.entries(
                  purchases.reduce((acc, purchase) => {
                    acc[purchase.method] = (acc[purchase.method] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([method, count]) => (
                  <Box key={method} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{method}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {count} compras ({(count / purchases.length * 100).toFixed(1)}%)
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      height: 8, 
                      bgcolor: 'primary.main',
                      borderRadius: 4,
                      width: `${(count / purchases.length * 100)}%`
                    }} />
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
                Tendencias de Compra
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Ticket Promedio:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(purchases.reduce((sum, p) => sum + p.amount, 0) / purchases.length)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Items por Compra:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {(purchases.reduce((sum, p) => sum + p.items, 0) / purchases.length).toFixed(1)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Frecuencia de Compra:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Cada {(30 / (purchases.length / new Set(purchases.map(p => p.client)).size)).toFixed(1)} días
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PurchaseHistory;