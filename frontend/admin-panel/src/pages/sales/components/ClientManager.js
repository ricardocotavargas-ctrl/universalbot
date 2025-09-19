// frontend/admin-panel/src/pages/sales/components/ClientManager.js
import React, { useState, useMemo } from 'react';
import {
  Box, Button, TextField, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, Typography, Chip, Avatar,
  List, ListItem, ListItemText, ListItemAvatar, InputAdornment,
  Grid // ✅ FALTABA ESTA IMPORTACIÓN
} from '@mui/material';
import { PersonAdd, Search, Edit, Business, Person } from '@mui/icons-material';

const ClientManager = ({ client, onClientSelect, onClientClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newClient, setNewClient] = useState({
    tipoDocumento: 'V',
    documento: '',
    nombre: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  // Datos de ejemplo mejorados
  const [clients, setClients] = useState([
    {
      id: 1,
      tipoDocumento: 'rif',
      documento: 'J-123456789',
      nombre: 'Cliente Corporativo SA',
      telefono: '+58 412-555-1234',
      email: 'cliente@corporativo.com',
      direccion: 'Av. Principal, Caracas',
      esEmpresa: true
    },
    {
      id: 2,
      tipoDocumento: 'V',
      documento: 'V-12345678',
      nombre: 'Juan Pérez',
      telefono: '+58 414-555-5678',
      email: 'juan@email.com',
      direccion: 'Calle Secundaria, Valencia',
      esEmpresa: false
    },
    {
      id: 3,
      tipoDocumento: 'E',
      documento: 'E-98765432',
      nombre: 'Maria Rodriguez',
      telefono: '+58 416-555-9012',
      email: 'maria@email.com',
      direccion: 'Av. Bolívar, Maracaibo',
      esEmpresa: false
    }
  ]);

  const clientDocumentTypes = [
    { value: 'V', label: 'V - Cédula Venezolana' },
    { value: 'E', label: 'E - Cédula Extranjero' },
    { value: 'J', label: 'J - RIF Jurídico' },
    { value: 'G', label: 'G - RIF Gubernamental' },
    { value: 'V-RIF', label: 'V - RIF Personal' }
  ];

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    const term = searchTerm.toLowerCase();
    return clients.filter(client =>
      client.documento.toLowerCase().includes(term) ||
      client.nombre.toLowerCase().includes(term) ||
      client.telefono.toLowerCase().includes(term)
    );
  }, [clients, searchTerm]);

  const getDocumentPrefix = (tipo) => {
    switch (tipo) {
      case 'V': return 'V-';
      case 'E': return 'E-';
      case 'J': return 'J-';
      case 'G': return 'G-';
      case 'V-RIF': return 'V-';
      default: return '';
    }
  };

  const handleAddClient = () => {
    const documentoCompleto = `${getDocumentPrefix(newClient.tipoDocumento)}${newClient.documento}`;
    
    const newClientData = {
      ...newClient,
      id: editMode ? newClient.id : Math.max(...clients.map(c => c.id), 0) + 1,
      documento: documentoCompleto,
      esEmpresa: ['J', 'G', 'V-RIF'].includes(newClient.tipoDocumento)
    };

    if (editMode) {
      setClients(prev => prev.map(c => c.id === newClient.id ? newClientData : c));
    } else {
      setClients(prev => [...prev, newClientData]);
    }

    onClientSelect(newClientData);
    setDialogOpen(false);
    setEditMode(false);
    setNewClient({
      tipoDocumento: 'V',
      documento: '',
      nombre: '',
      telefono: '',
      email: '',
      direccion: ''
    });
  };

  const handleEdit = (client) => {
    const numeroDocumento = client.documento.replace(/^[A-Z]-/, '');
    setNewClient({ ...client, documento: numeroDocumento });
    setEditMode(true);
    setDialogOpen(true);
  };

  return (
    <Box>
      {client ? (
        <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {client.esEmpresa ? <Business /> : <Person />}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {client.nombre}
                </Typography>
                <Typography variant="body2">
                  {client.documento}
                </Typography>
                <Typography variant="body2">
                  Tel: {client.telefono}
                </Typography>
              </Box>
            </Box>
            <Button
              size="small"
              startIcon={<Edit />}
              onClick={() => handleEdit(client)}
              variant="outlined"
            >
              Editar
            </Button>
          </Box>
          <Button
            size="small"
            onClick={onClientClear}
            sx={{ mt: 1 }}
          >
            Cambiar Cliente
          </Button>
        </Box>
      ) : (
        <Box>
          <TextField
            fullWidth
            placeholder="Buscar cliente por cédula, RIF o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {searchTerm && filteredClients.length > 0 && (
            <List sx={{ maxHeight: 200, overflow: 'auto', mt: 1, border: '1px solid', borderColor: 'divider' }}>
              {filteredClients.map((client) => (
                <ListItem
                  key={client.id}
                  button
                  onClick={() => onClientSelect(client)}
                  sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      {client.esEmpresa ? <Business /> : <Person />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={client.nombre}
                    secondary={
                      <Box>
                        <Typography variant="caption" display="block">
                          {client.documento}
                        </Typography>
                        <Typography variant="caption">
                          Tel: {client.telefono}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<PersonAdd />}
            onClick={() => setDialogOpen(true)}
            sx={{ mt: 1 }}
          >
            Nuevo Cliente
          </Button>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de Documento"
                  value={newClient.tipoDocumento}
                  onChange={(e) => setNewClient({ ...newClient, tipoDocumento: e.target.value })}
                  size="small"
                >
                  {clientDocumentTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número de Documento"
                  value={newClient.documento}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setNewClient({ ...newClient, documento: value });
                  }}
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getDocumentPrefix(newClient.tipoDocumento)}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={['J', 'G', 'V-RIF'].includes(newClient.tipoDocumento) ? 'Razón Social' : 'Nombre Completo'}
                  value={newClient.nombre}
                  onChange={(e) => setNewClient({ ...newClient, nombre: e.target.value })}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={newClient.telefono}
                  onChange={(e) => setNewClient({ ...newClient, telefono: e.target.value })}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  multiline
                  rows={2}
                  value={newClient.direccion}
                  onChange={(e) => setNewClient({ ...newClient, direccion: e.target.value })}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDialogOpen(false);
            setEditMode(false);
            setNewClient({
              tipoDocumento: 'V',
              documento: '',
              nombre: '',
              telefono: '',
              email: '',
              direccion: ''
            });
          }}>
            Cancelar
          </Button>
          <Button
            onClick={handleAddClient}
            variant="contained"
            disabled={!newClient.documento || !newClient.nombre || !newClient.telefono}
          >
            {editMode ? 'Actualizar' : 'Registrar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientManager;