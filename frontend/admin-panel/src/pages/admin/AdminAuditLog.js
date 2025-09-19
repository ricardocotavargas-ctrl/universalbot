import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Pagination, Avatar
} from '@mui/material';
import {
  History, Security, Person, Settings, ShoppingCart, Inventory,
  FilterList, Download, Search
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const AdminAuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const mockLogs = [
    {
      id: 1,
      timestamp: '2024-05-20 14:30:25',
      user: 'admin@empresa.com',
      action: 'user_login',
      description: 'Inicio de sesión exitoso',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-05-20 14:25:18',
      user: 'ventas@empresa.com',
      action: 'sale_create',
      description: 'Creó nueva venta #12345',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-05-20 13:45:32',
      user: 'inventario@empresa.com',
      action: 'inventory_update',
      description: 'Actualizó stock del producto CAFE-001',
      ip: '192.168.1.102',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2024-05-20 12:15:47',
      user: 'admin@empresa.com',
      action: 'user_create',
      description: 'Creó nuevo usuario: soporte@empresa.com',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-05-20 11:20:33',
      user: 'cliente@externo.com',
      action: 'user_login',
      description: 'Intento de acceso fallido - contraseña incorrecta',
      ip: '201.159.23.45',
      status: 'failed'
    }
  ];

  const mockUsers = [
    'admin@empresa.com',
    'ventas@empresa.com',
    'inventario@empresa.com',
    'cliente@externo.com'
  ];

  const actionTypes = [
    'all',
    'user_login',
    'user_create',
    'user_update',
    'sale_create',
    'sale_update',
    'inventory_update',
    'settings_change'
  ];

  useEffect(() => {
    setLogs(mockLogs);
  }, []);

  const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString('es-VE');
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'user_login': return <Person />;
      case 'user_create': return <Person />;
      case 'user_update': return <Person />;
      case 'sale_create': return <ShoppingCart />;
      case 'sale_update': return <ShoppingCart />;
      case 'inventory_update': return <Inventory />;
      case 'settings_change': return <Settings />;
      default: return <History />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'user_login': return 'primary';
      case 'user_create': return 'success';
      case 'user_update': return 'warning';
      case 'sale_create': return 'success';
      case 'sale_update': return 'warning';
      case 'inventory_update': return 'info';
      case 'settings_change': return 'secondary';
      default: return 'default';
    }
  };

  const getActionText = (action) => {
    const actions = {
      'user_login': 'Inicio de Sesión',
      'user_create': 'Crear Usuario',
      'user_update': 'Actualizar Usuario',
      'sale_create': 'Crear Venta',
      'sale_update': 'Actualizar Venta',
      'inventory_update': 'Actualizar Inventario',
      'settings_change': 'Cambiar Configuración'
    };
    return actions[action] || action;
  };

  const filteredLogs = logs.filter(log => {
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    return matchesAction && matchesUser;
  });

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Registro de Auditoría
        </Typography>
        <Typography color="text.secondary">
          Historial completo de actividades del sistema
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Tipo de Acción</InputLabel>
            <Select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              label="Tipo de Acción"
            >
              <MenuItem value="all">Todas las acciones</MenuItem>
              {actionTypes.filter(a => a !== 'all').map((action) => (
                <MenuItem key={action} value={action}>
                  {getActionText(action)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Usuario</InputLabel>
            <Select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              label="Usuario"
            >
              <MenuItem value="all">Todos los usuarios</MenuItem>
              {mockUsers.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            placeholder="Buscar en registros..."
            InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
            sx={{ minWidth: 250 }}
          />

          <Button variant="outlined" startIcon={<Download />}>
            Exportar Registros
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Registros
              </Typography>
              <Typography variant="h4">{logs.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Acciones Exitosas
              </Typography>
              <Typography variant="h4" color="success.main">
                {logs.filter(l => l.status === 'success').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Acciones Fallidas
              </Typography>
              <Typography variant="h4" color="error.main">
                {logs.filter(l => l.status === 'failed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Usuarios Únicos
              </Typography>
              <Typography variant="h4">
                {new Set(logs.map(l => l.user)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Historial de Actividades
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha/Hora</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Acción</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Dirección IP</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDateTime(log.timestamp)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                        {log.user.charAt(0).toUpperCase()}
                      </Avatar>
                      {log.user}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getActionIcon(log.action)}
                      label={getActionText(log.action)}
                      color={getActionColor(log.action)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>
                    <Chip label={log.ip} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={log.status === 'success' ? 'Éxito' : 'Fallido'}
                      color={log.status === 'success' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredLogs.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <History sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No hay registros que coincidan con los filtros
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredLogs.length / 10)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </UBCard>

      {/* Resumen de Actividades */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actividad por Tipo
              </Typography>
              <Box sx={{ mt: 2 }}>
                {Object.entries(
                  logs.reduce((acc, log) => {
                    acc[log.action] = (acc[log.action] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([action, count]) => (
                  <Box key={action} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {getActionText(action)}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {count} acciones
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      height: 8, 
                      bgcolor: `${getActionColor(action)}.main`,
                      borderRadius: 4,
                      width: `${(count / logs.length) * 100}%`
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
                Actividad por Usuario
              </Typography>
              <Box sx={{ mt: 2 }}>
                {Object.entries(
                  logs.reduce((acc, log) => {
                    acc[log.user] = (acc[log.user] || 0) + 1;
                    return acc;
                  }, {})
                ).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([user, count]) => (
                  <Box key={user} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2">{user}</Typography>
                    <Typography variant="body2" fontWeight="bold">{count} acciones</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminAuditLog;