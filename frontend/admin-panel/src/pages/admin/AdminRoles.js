import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Switch,
  FormControlLabel, IconButton
} from '@mui/material';
import {
  Security, People, Edit, Delete, Add, CheckCircle, Cancel
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const AdminRoles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const mockRoles = [
    {
      id: 1,
      name: 'Administrador',
      description: 'Acceso completo al sistema',
      userCount: 3,
      permissions: ['all'],
      isDefault: false
    },
    {
      id: 2,
      name: 'Gerente',
      description: 'Gestión de operaciones y reportes',
      userCount: 5,
      permissions: ['view_reports', 'manage_inventory', 'view_financial'],
      isDefault: false
    },
    {
      id: 3,
      name: 'Vendedor',
      description: 'Acceso a ventas y clientes',
      userCount: 12,
      permissions: ['manage_sales', 'view_clients'],
      isDefault: true
    },
    {
      id: 4,
      name: 'Soporte',
      description: 'Acceso limitado a consultas',
      userCount: 2,
      permissions: ['view_clients', 'view_basic'],
      isDefault: false
    }
  ];

  const mockPermissions = [
    { id: 'view_dashboard', name: 'Ver Dashboard', category: 'General' },
    { id: 'view_reports', name: 'Ver Reportes', category: 'General' },
    { id: 'manage_users', name: 'Gestionar Usuarios', category: 'Administración' },
    { id: 'manage_roles', name: 'Gestionar Roles', category: 'Administración' },
    { id: 'manage_sales', name: 'Gestionar Ventas', category: 'Ventas' },
    { id: 'view_financial', name: 'Ver Datos Financieros', category: 'Finanzas' },
    { id: 'manage_inventory', name: 'Gestionar Inventario', category: 'Inventario' },
    { id: 'view_clients', name: 'Ver Clientes', category: 'Marketing' },
    { id: 'manage_marketing', name: 'Gestionar Marketing', category: 'Marketing' },
    { id: 'all', name: 'Todos los Permisos', category: 'Sistema' }
  ];

  useEffect(() => {
    setRoles(mockRoles);
    setPermissions(mockPermissions);
  }, []);

  const getPermissionCategory = (permissionId) => {
    const permission = permissions.find(p => p.id === permissionId);
    return permission ? permission.category : 'Desconocido';
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setOpenDialog(true);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este rol?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Roles y Permisos
        </Typography>
        <Typography color="text.secondary">
          Administra los niveles de acceso y permisos del sistema
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h6">
            Roles del Sistema
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nuevo Rol
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {roles.map((role) => (
          <Grid item xs={12} md={6} lg={4} key={role.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">{role.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {role.description}
                    </Typography>
                  </Box>
                  {role.isDefault && (
                    <Chip label="Predeterminado" color="primary" size="small" />
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    <People sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
                    {role.userCount} usuarios asignados
                  </Typography>
                  
                  <Typography variant="body2" gutterBottom>
                    <Security sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
                    {role.permissions.length} permiso(s)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => handleEditRole(role)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteRole(role.id)}
                    disabled={role.isDefault}
                  >
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Matriz de Permisos
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Permiso</TableCell>
                <TableCell>Categoría</TableCell>
                {roles.map((role) => (
                  <TableCell key={role.id} align="center">
                    {role.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <Typography fontWeight="medium">{permission.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {permission.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={permission.category} size="small" variant="outlined" />
                  </TableCell>
                  {roles.map((role) => (
                    <TableCell key={role.id} align="center">
                      {role.permissions.includes('all') || role.permissions.includes(permission.id) ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Cancel color="error" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Diálogo para editar/crear rol */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRole ? 'Editar Rol' : 'Nuevo Rol'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del Rol"
                defaultValue={editingRole?.name}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                defaultValue={editingRole?.description}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked={editingRole?.isDefault} />}
                label="Rol Predeterminado para nuevos usuarios"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Permisos del Rol
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto', p: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                {permissions.map((permission) => (
                  <FormControlLabel
                    key={permission.id}
                    control={
                      <Switch
                        defaultChecked={
                          editingRole 
                            ? editingRole.permissions.includes('all') || editingRole.permissions.includes(permission.id)
                            : false
                        }
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2">{permission.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {permission.category}
                        </Typography>
                      </Box>
                    }
                    sx={{ display: 'block', mb: 1 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {editingRole ? 'Actualizar' : 'Crear'} Rol
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminRoles;