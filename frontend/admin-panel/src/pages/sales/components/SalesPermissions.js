import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Alert, Checkbox,
  List, ListItem, ListItemText, ListItemIcon,
  Divider
} from '@mui/material';
import {
  Security, PersonAdd, Edit, Delete,
  AdminPanelSettings, PointOfSale, Inventory,
  AccountBalance, Assignment, History
} from '@mui/icons-material';

const SalesPermissions = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Admin Principal',
      email: 'admin@tienda.com',
      rol: 'administrador',
      activo: true,
      permisos: {
        ventas: { leer: true, escribir: true, eliminar: true },
        inventario: { leer: true, escribir: true, eliminar: true },
        clientes: { leer: true, escribir: true, eliminar: true },
        reportes: { leer: true, escribir: false, eliminar: false },
        configuracion: { leer: true, escribir: true, eliminar: true }
      }
    },
    {
      id: 2,
      nombre: 'Cajero 1',
      email: 'cajero1@tienda.com',
      rol: 'cajero',
      activo: true,
      permisos: {
        ventas: { leer: true, escribir: true, eliminar: false },
        inventario: { leer: true, escribir: false, eliminar: false },
        clientes: { leer: true, escribir: true, eliminar: false },
        reportes: { leer: false, escribir: false, eliminar: false },
        configuracion: { leer: false, escribir: false, eliminar: false }
      }
    }
  ]);

  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    rol: 'cajero',
    activo: true,
    permisos: {
      ventas: { leer: true, escribir: true, eliminar: false },
      inventario: { leer: true, escribir: false, eliminar: false },
      clientes: { leer: true, escribir: true, eliminar: false },
      reportes: { leer: false, escribir: false, eliminar: false },
      configuracion: { leer: false, escribir: false, eliminar: false }
    }
  });

  const roles = [
    { value: 'administrador', label: 'Administrador', icon: <AdminPanelSettings /> },
    { value: 'gerente', label: 'Gerente', icon: <Security /> },
    { value: 'cajero', label: 'Cajero', icon: <PointOfSale /> },
    { value: 'inventario', label: 'Inventario', icon: <Inventory /> }
  ];

  const modulos = [
    { key: 'ventas', label: 'Ventas', icon: <PointOfSale /> },
    { key: 'inventario', label: 'Inventario', icon: <Inventory /> },
    { key: 'clientes', label: 'Clientes', icon: <Assignment /> },
    { key: 'reportes', label: 'Reportes', icon: <History /> },
    { key: 'configuracion', label: 'Configuración', icon: <AdminPanelSettings /> }
  ];

  const acciones = [
    { key: 'leer', label: 'Ver' },
    { key: 'escribir', label: 'Crear/Editar' },
    { key: 'eliminar', label: 'Eliminar' }
  ];

  const abrirDialogNuevoUsuario = () => {
    setUsuarioEditando(null);
    setNuevoUsuario({
      nombre: '',
      email: '',
      rol: 'cajero',
      activo: true,
      permisos: {
        ventas: { leer: true, escribir: true, eliminar: false },
        inventario: { leer: true, escribir: false, eliminar: false },
        clientes: { leer: true, escribir: true, eliminar: false },
        reportes: { leer: false, escribir: false, eliminar: false },
        configuracion: { leer: false, escribir: false, eliminar: false }
      }
    });
    setDialogAbierto(true);
  };

  const abrirDialogEditarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setNuevoUsuario(usuario);
    setDialogAbierto(true);
  };

  const guardarUsuario = () => {
    if (usuarioEditando) {
      setUsuarios(prev =>
        prev.map(u => u.id === usuarioEditando.id ? nuevoUsuario : u)
      );
    } else {
      setUsuarios(prev => [...prev, { ...nuevoUsuario, id: Date.now() }]);
    }
    setDialogAbierto(false);
  };

  const toggleEstadoUsuario = (id) => {
    setUsuarios(prev =>
      prev.map(u =>
        u.id === id ? { ...u, activo: !u.activo } : u
      )
    );
  };

  const actualizarPermiso = (modulo, accion, valor) => {
    setNuevoUsuario(prev => ({
      ...prev,
      permisos: {
        ...prev.permisos,
        [modulo]: {
          ...prev.permisos[modulo],
          [accion]: valor
        }
      }
    }));
  };

  const getColorRol = (rol) => {
    switch (rol) {
      case 'administrador': return 'error';
      case 'gerente': return 'warning';
      case 'cajero': return 'success';
      case 'inventario': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <Security sx={{ mr: 2, verticalAlign: 'bottom' }} />
        Gestión de Permisos
      </Typography>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Total Usuarios</Typography>
              <Typography variant="h4">{usuarios.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Usuarios Activos</Typography>
              <Typography variant="h4" color="success.main">
                {usuarios.filter(u => u.activo).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Administradores</Typography>
              <Typography variant="h4">
                {usuarios.filter(u => u.rol === 'administrador').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Cajeros</Typography>
              <Typography variant="h4">
                {usuarios.filter(u => u.rol === 'cajero').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Botón nuevo usuario */}
      <Button
        variant="contained"
        startIcon={<PersonAdd />}
        onClick={abrirDialogNuevoUsuario}
        sx={{ mb: 3 }}
      >
        Nuevo Usuario
      </Button>

      {/* Tabla de usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Permisos</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>
                  <Typography fontWeight="bold">{usuario.nombre}</Typography>
                </TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                  <Chip
                    label={usuario.rol.toUpperCase()}
                    color={getColorRol(usuario.rol)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={usuario.activo ? 'ACTIVO' : 'INACTIVO'}
                    color={usuario.activo ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {Object.entries(usuario.permisos).map(([modulo, permisos]) => (
                      permisos.leer && (
                        <Chip
                          key={modulo}
                          label={modulo}
                          size="small"
                          variant="outlined"
                        />
                      )
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => abrirDialogEditarUsuario(usuario)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Switch
                    checked={usuario.activo}
                    onChange={() => toggleEstadoUsuario(usuario.id)}
                    color={usuario.activo ? 'success' : 'default'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog de usuario */}
      <Dialog open={dialogAbierto} onClose={() => setDialogAbierto(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre completo"
                value={nuevoUsuario.nombre}
                onChange={(e) => setNuevoUsuario(prev => ({ ...prev, nombre: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={nuevoUsuario.email}
                onChange={(e) => setNuevoUsuario(prev => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  value={nuevoUsuario.rol}
                  onChange={(e) => setNuevoUsuario(prev => ({ ...prev, rol: e.target.value }))}
                  label="Rol"
                >
                  {roles.map((rol) => (
                    <MenuItem key={rol.value} value={rol.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1 }}>{rol.icon}</Box>
                        {rol.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={nuevoUsuario.activo}
                    onChange={(e) => setNuevoUsuario(prev => ({ ...prev, activo: e.target.checked }))}
                  />
                }
                label="Usuario activo"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Permisos</Typography>
            </Grid>

            {modulos.map((modulo) => (
              <Grid item xs={12} key={modulo.key}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ mr: 1 }}>{modulo.icon}</Box>
                      <Typography fontWeight="bold">{modulo.label}</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {acciones.map((accion) => (
                        <Grid item xs={4} key={accion.key}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={nuevoUsuario.permisos[modulo.key][accion.key]}
                                onChange={(e) => actualizarPermiso(modulo.key, accion.key, e.target.checked)}
                                disabled={accion.key === 'eliminar' && !nuevoUsuario.permisos[modulo.key].escribir}
                              />
                            }
                            label={accion.label}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogAbierto(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={guardarUsuario}
            disabled={!nuevoUsuario.nombre || !nuevoUsuario.email}
          >
            {usuarioEditando ? 'Actualizar' : 'Crear'} Usuario
          </Button>
        </DialogActions>
      </Dialog>

      {/* Plantillas de roles */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Plantillas de Roles Predefinidas</Typography>
        <Grid container spacing={2}>
          {roles.map((rol) => (
            <Grid item xs={12} md={6} key={rol.value}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 1 }}>{rol.icon}</Box>
                    <Typography fontWeight="bold">{rol.label}</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {rol.value === 'administrador' && 'Acceso completo a todos los módulos del sistema'}
                    {rol.value === 'gerente' && 'Acceso a ventas, reportes y gestión de clientes'}
                    {rol.value === 'cajero' && 'Acceso limitado a procesamiento de ventas'}
                    {rol.value === 'inventario' && 'Acceso a gestión de productos e inventario'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default SalesPermissions;