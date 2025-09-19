import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem,
  IconButton, Collapse, Alert
} from '@mui/material';
import {
  History, Security, Search, FilterList,
  Visibility, KeyboardArrowDown, KeyboardArrowUp,
  Assignment, PointOfSale, Person
} from '@mui/icons-material';

const SalesAudit = () => {
  const [registrosAuditoria, setRegistrosAuditoria] = useState([]);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    usuario: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [dialogDetalles, setDialogDetalles] = useState(false);
  const [registrosExpandidos, setRegistrosExpandidos] = useState({});

  useEffect(() => {
    // Simular carga de datos de auditoría
    const datosAuditoria = [
      {
        id: 1,
        tipo: 'venta',
        accion: 'CREACIÓN',
        usuario: 'admin@tienda.com',
        fecha: '2024-01-15 14:30:25',
        detalles: {
          ventaId: 'V-001234',
          cliente: 'Juan Pérez',
          total: 1250.50,
          productos: 3,
          metodoPago: 'efectivo'
        },
        ip: '192.168.1.100',
        dispositivo: 'POS-001'
      },
      {
        id: 2,
        tipo: 'devolucion',
        accion: 'PROCESAMIENTO',
        usuario: 'cajero1@tienda.com',
        fecha: '2024-01-15 12:15:30',
        detalles: {
          devolucionId: 'DEV-000567',
          ventaOriginal: 'V-001234',
          monto: 250.00,
          motivo: 'Producto defectuoso'
        },
        ip: '192.168.1.101',
        dispositivo: 'POS-002'
      },
      {
        id: 3,
        tipo: 'ajuste',
        accion: 'MODIFICACIÓN',
        usuario: 'admin@tienda.com',
        fecha: '2024-01-14 16:45:12',
        detalles: {
          producto: 'iPhone 13 Pro',
          campo: 'precio',
          valorAnterior: 999.99,
          valorNuevo: 949.99,
          motivo: 'Promoción especial'
        },
        ip: '192.168.1.100',
        dispositivo: 'Sistema Web'
      }
    ];
    setRegistrosAuditoria(datosAuditoria);
  }, []);

  const toggleExpandirRegistro = (id) => {
    setRegistrosExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filtrarRegistros = () => {
    return registrosAuditoria.filter(registro => {
      if (filtros.tipo !== 'todos' && registro.tipo !== filtros.tipo) return false;
      if (filtros.usuario && !registro.usuario.includes(filtros.usuario)) return false;
      if (filtros.fechaInicio && registro.fecha < filtros.fechaInicio) return false;
      if (filtros.fechaFin && registro.fecha > filtros.fechaFin + ' 23:59:59') return false;
      return true;
    });
  };

  const getColorPorTipo = (tipo) => {
    switch (tipo) {
      case 'venta': return 'success';
      case 'devolucion': return 'warning';
      case 'ajuste': return 'info';
      case 'seguridad': return 'error';
      default: return 'default';
    }
  };

  const getIconoPorTipo = (tipo) => {
    switch (tipo) {
      case 'venta': return <PointOfSale />;
      case 'devolucion': return <Assignment />;
      case 'ajuste': return <Security />;
      default: return <History />;
    }
  };

  const registrosFiltrados = filtrarRegistros();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <Security sx={{ mr: 2, verticalAlign: 'bottom' }} />
        Auditoría del Sistema
      </Typography>

      {/* Filtros y Búsqueda */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Filtros de Auditoría</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Evento</InputLabel>
              <Select
                value={filtros.tipo}
                onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
                label="Tipo de Evento"
              >
                <MenuItem value="todos">Todos los eventos</MenuItem>
                <MenuItem value="venta">Ventas</MenuItem>
                <MenuItem value="devolucion">Devoluciones</MenuItem>
                <MenuItem value="ajuste">Ajustes</MenuItem>
                <MenuItem value="seguridad">Seguridad</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Usuario"
              value={filtros.usuario}
              onChange={(e) => setFiltros(prev => ({ ...prev, usuario: e.target.value }))}
              placeholder="Buscar por usuario..."
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Inicio"
              value={filtros.fechaInicio}
              onChange={(e) => setFiltros(prev => ({ ...prev, fechaInicio: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Fin"
              value={filtros.fechaFin}
              onChange={(e) => setFiltros(prev => ({ ...prev, fechaFin: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={() => {}} // Re-filtrar
            >
              Buscar
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ ml: 2 }}
              onClick={() => setFiltros({
                tipo: 'todos',
                usuario: '',
                fechaInicio: '',
                fechaFin: ''
              })}
            >
              Limpiar Filtros
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Total Eventos</Typography>
              <Typography variant="h4">{registrosFiltrados.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Eventos Hoy</Typography>
              <Typography variant="h4" color="primary">
                {registrosFiltrados.filter(r => r.fecha.includes('2024-01-15')).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Usuarios Activos</Typography>
              <Typography variant="h4">
                {new Set(registrosFiltrados.map(r => r.usuario)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Dispositivos</Typography>
              <Typography variant="h4">
                {new Set(registrosFiltrados.map(r => r.dispositivo)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla de Auditoría */}
      <Typography variant="h6" gutterBottom>Registros de Auditoría</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="50px"></TableCell>
              <TableCell>Fecha y Hora</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acción</TableCell>
              <TableCell>Dispositivo</TableCell>
              <TableCell>IP</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrosFiltrados.map((registro) => (
              <React.Fragment key={registro.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => toggleExpandirRegistro(registro.id)}
                    >
                      {registrosExpandidos[registro.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{registro.fecha}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Person sx={{ mr: 1, fontSize: 18 }} />
                      {registro.usuario}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getIconoPorTipo(registro.tipo)}
                      label={registro.tipo.toUpperCase()}
                      color={getColorPorTipo(registro.tipo)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{registro.accion}</TableCell>
                  <TableCell>{registro.dispositivo}</TableCell>
                  <TableCell>{registro.ip}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setRegistroSeleccionado(registro);
                        setDialogDetalles(true);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={8} style={{ padding: 0, border: 0 }}>
                    <Collapse in={registrosExpandidos[registro.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Detalles del Evento:
                        </Typography>
                        <pre style={{ margin: 0, fontSize: '12px' }}>
                          {JSON.stringify(registro.detalles, null, 2)}
                        </pre>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {registrosFiltrados.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No se encontraron registros con los filtros aplicados
        </Alert>
      )}

      {/* Dialog de Detalles */}
      <Dialog open={dialogDetalles} onClose={() => setDialogDetalles(false)} maxWidth="md" fullWidth>
        <DialogTitle>Detalles del Registro de Auditoría</DialogTitle>
        <DialogContent>
          {registroSeleccionado && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Usuario:</Typography>
                  <Typography>{registroSeleccionado.usuario}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Fecha:</Typography>
                  <Typography>{registroSeleccionado.fecha}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Tipo:</Typography>
                  <Chip
                    label={registroSeleccionado.tipo.toUpperCase()}
                    color={getColorPorTipo(registroSeleccionado.tipo)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Acción:</Typography>
                  <Typography>{registroSeleccionado.accion}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Dispositivo:</Typography>
                  <Typography>{registroSeleccionado.dispositivo}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">IP:</Typography>
                  <Typography>{registroSeleccionado.ip}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Detalles:</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                    <pre style={{ margin: 0, fontSize: '12px' }}>
                      {JSON.stringify(registroSeleccionado.detalles, null, 2)}
                    </pre>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogDetalles(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesAudit;