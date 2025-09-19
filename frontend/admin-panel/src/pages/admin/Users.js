// frontend/admin-panel/src/pages/Users.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Alert,
  alpha,
  useTheme
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Add,
  Person,
  Email,
  Phone,
  Business,
  Security,
  Edit,
  Delete,
  Lock,
  LockOpen,
  AdminPanelSettings,
  Person as UserIcon,
  SupervisedUserCircle
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';

const Users = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Datos de demostración
  useEffect(() => {
    const demoUsers = [
      {
        id: 1,
        firstName: 'María',
        lastName: 'González',
        email: 'maria@restaurantesabores.com',
        phone: '+58 412-555-7890',
        role: 'admin',
        status: 'active',
        company: 'Restaurante Sabores',
        lastLogin: '2024-01-15 14:30:25',
        permissions: ['read', 'write', 'delete', 'manage_users'],
        twoFactor: true,
        avatar: '/avatars/maria.jpg'
      },
      {
        id: 2,
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        email: 'carlos@autoservicecr.com',
        phone: '+58 414-555-1234',
        role: 'user',
        status: 'active',
        company: 'AutoService CR',
        lastLogin: '2024-01-15 13:15:42',
        permissions: ['read', 'write'],
        twoFactor: false,
        avatar: '/avatars/carlos.jpg'
      },
      {
        id: 3,
        firstName: 'Ana',
        lastName: 'Mendoza',
        email: 'ana@tiendafashion.com',
        phone: '+58 416-555-5678',
        role: 'user',
        status: 'inactive',
        company: 'Tienda Fashion',
        lastLogin: '2024-01-10 09:45:18',
        permissions: ['read'],
        twoFactor: true,
        avatar: '/avatars/ana.jpg'
      },
      {
        id: 4,
        firstName: 'Javier',
        lastName: 'López',
        email: 'javier@consultoriajl.com',
        phone: '+58 424-555-9012',
        role: 'superadmin',
        status: 'active',
        company: 'Consultoría JL',
        lastLogin: '2024-01-15 11:20:33',
        permissions: ['read', 'write', 'delete', 'manage_users', 'manage_companies'],
        twoFactor: true,
        avatar: '/avatars/javier.jpg'
      },
      {
        id: 5,
        firstName: 'Isabela',
        lastName: 'Torres',
        email: 'isabela@salonbelleza.com',
        phone: '+58 426-555-3456',
        role: 'user',
        status: 'pending',
        company: 'Salón Belleza',
        lastLogin: null,
        permissions: ['read'],
        twoFactor: false,
        avatar: '/avatars/isabela.jpg'
      }
    ];
    setUsers(demoUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === 'all' || user.role === filter || user.status === filter)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin': return 'error';
      case 'admin': return 'warning';
      case 'user': return 'primary';
      case 'guest': return 'default';
      default: return 'default';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'superadmin': return 'Super Admin';
      case 'admin': return 'Administrador';
      case 'user': return 'Usuario';
      case 'guest': return 'Invitado';
      default: return role;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'superadmin': return <AdminPanelSettings />;
      case 'admin': return <Security />;
      case 'user': return <UserIcon />;
      default: return <Person />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleSaveUser = (userData) => {
    setSaveStatus('saving');
    
    setTimeout(() => {
      if (editingUser) {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
      } else {
        const newUser = {
          id: Math.max(...users.map(u => u.id)) + 1,
          ...userData,
          lastLogin: null,
          status: 'pending',
          twoFactor: false,
          permissions: ['read']
        };
        setUsers([...users, newUser]);
      }
      
      setSaveStatus('success');
      setDialogOpen(false);
      
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const UserDialog = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                defaultValue={editingUser?.firstName || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Apellido"
                defaultValue={editingUser?.lastName || ''}
                fullWidth
              />
            </Grid>
          </Grid>

          <TextField
            label="Email"
            type="email"
            defaultValue={editingUser?.email || ''}
            fullWidth
          />

          <TextField
            label="Teléfono"
            defaultValue={editingUser?.phone || ''}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Empresa</InputLabel>
            <Select
              defaultValue={editingUser?.company || ''}
              label="Empresa"
            >
              <MenuItem value="Restaurante Sabores">Restaurante Sabores</MenuItem>
              <MenuItem value="AutoService CR">AutoService CR</MenuItem>
              <MenuItem value="Tienda Fashion">Tienda Fashion</MenuItem>
              <MenuItem value="Consultoría JL">Consultoría JL</MenuItem>
              <MenuItem value="Salón Belleza">Salón Belleza</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              defaultValue={editingUser?.role || 'user'}
              label="Rol"
            >
              <MenuItem value="superadmin">Super Administrador</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="guest">Invitado</MenuItem>
            </Select>
          </FormControl>

          {editingUser && (
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                defaultValue={editingUser?.status || 'pending'}
                label="Estado"
              >
                <MenuItem value="active">Activo</MenuItem>
                <MenuItem value="inactive">Inactivo</MenuItem>
                <MenuItem value="pending">Pendiente</MenuItem>
              </Select>
            </FormControl>
          )}

          {editingUser && (
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={editingUser?.twoFactor || false}
                />
              }
              label="Autenticación de Dos Factores"
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
        <Button onClick={handleSaveUser} variant="contained" disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Guardando...' : (editingUser ? 'Actualizar' : 'Crear')}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const UserRow = ({ user }) => (
    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{user.company}</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ color: `${getRoleColor(user.role)}.main` }}>
            {getRoleIcon(user.role)}
          </Box>
          <Chip
            label={getRoleLabel(user.role)}
            size="small"
            color={getRoleColor(user.role)}
            variant="outlined"
          />
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={getStatusLabel(user.status)}
          size="small"
          color={getStatusColor(user.status)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            label={user.permissions.length}
            size="small"
            variant="outlined"
          />
          {user.twoFactor && (
            <Chip
              icon={<Lock />}
              label="2FA"
              size="small"
              color="success"
              variant="outlined"
            />
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {user.lastLogin ? user.lastLogin.split(' ')[0] : 'Nunca'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user.lastLogin ? user.lastLogin.split(' ')[1] : ''}
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => handleToggleStatus(user.id)}
          color={user.status === 'active' ? 'success' : 'default'}
        >
          {user.status === 'active' ? <LockOpen /> : <Lock />}
        </IconButton>
        <IconButton
          size="small"
          onClick={(e) => {
            setSelectedUser(user);
            setMenuAnchorEl(e.currentTarget);
          }}
        >
          <MoreVert />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Gestión de Usuarios
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Administra usuarios y permisos del sistema
          </Typography>
        </Box>

        {/* Métricas Rápidas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Person sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {users.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Usuarios Totales
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <SupervisedUserCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {users.filter(u => u.status === 'active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Usuarios Activos
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Security sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {users.filter(u => u.role === 'admin' || u.role === 'superadmin').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Administradores
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Lock sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {users.filter(u => u.twoFactor).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Con 2FA Activado
                </Typography>
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* Barra de Búsqueda y Acciones */}
        <UBCard sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <Chip
                  label="Todos"
                  variant={filter === 'all' ? 'filled' : 'outlined'}
                  onClick={() => setFilter('all')}
                />
                <Chip
                  label="Administradores"
                  variant={filter === 'admin' ? 'filled' : 'outlined'}
                  onClick={() => setFilter('admin')}
                />
                <Chip
                  label="Activos"
                  variant={filter === 'active' ? 'filled' : 'outlined'}
                  onClick={() => setFilter('active')}
                />
                <Chip
                  label="Pendientes"
                  variant={filter === 'pending' ? 'filled' : 'outlined'}
                  onClick={() => setFilter('pending')}
                />
                <UBButton
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleCreateUser}
                >
                  Nuevo Usuario
                </UBButton>
              </Box>
            </Grid>
          </Grid>
        </UBCard>

        {/* Alertas de Estado */}
        {saveStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Usuario guardado exitosamente
          </Alert>
        )}

        {/* Tabla de Usuarios */}
        <UBCard title="Lista de Usuarios" subtitle={`${filteredUsers.length} usuarios encontrados`}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Empresa</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Permisos/2FA</TableCell>
                  <TableCell>Último Login</TableCell>
                  <TableCell width="100px">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Usuarios por página:"
          />
        </UBCard>
      </Box>

      {/* Menú de Acciones */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem onClick={() => { setMenuAnchorEl(null); handleEditUser(selectedUser); }}>
          <Edit sx={{ mr: 2 }} />
          Editar Usuario
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchorEl(null)}>
          <Security sx={{ mr: 2 }} />
          Gestionar Permisos
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchorEl(null)}>
          <Lock sx={{ mr: 2 }} />
          Reiniciar Contraseña
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchorEl(null)} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 2 }} />
          Eliminar Usuario
        </MenuItem>
      </Menu>

      {/* Dialog para crear/editar usuarios */}
      <UserDialog />
    </Container>
  );
};

export default Users;