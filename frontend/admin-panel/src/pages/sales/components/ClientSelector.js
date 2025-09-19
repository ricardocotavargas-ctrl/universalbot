import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, List, ListItem, ListItemText,
  ListItemAvatar, Avatar, Chip, Box, Typography,
  InputAdornment
} from '@mui/material';
import {
  Person, Search, Business, Star, Close
} from '@mui/icons-material';

const ClientSelector = ({ open, onClose, clientes, onSelectCliente }) => {
  const [busqueda, setBusqueda] = useState('');

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.documento.includes(busqueda) ||
    cliente.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getAvatarColor = (tipo) => {
    switch (tipo) {
      case 'premium': return '#ffd700';
      case 'empresa': return '#2196f3';
      default: return '#666666';
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'premium': return 'Premium';
      case 'empresa': return 'Empresa';
      default: return 'Regular';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Person sx={{ mr: 1 }} />
          Seleccionar Cliente
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Buscar cliente por nombre, documento o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ mb: 2, mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {clientesFiltrados.map((cliente) => (
            <ListItem
              key={cliente.id}
              button
              onClick={() => onSelectCliente(cliente)}
              sx={{
                mb: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.hover',
                  borderColor: 'primary.main'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getAvatarColor(cliente.tipo) }}>
                  {cliente.nombre.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">{cliente.nombre}</Typography>
                    <Chip
                      label={getTipoLabel(cliente.tipo)}
                      size="small"
                      color={cliente.tipo === 'premium' ? 'warning' : cliente.tipo === 'empresa' ? 'primary' : 'default'}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant="body2">{cliente.documento}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cliente.telefono} • {cliente.email}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}

          {clientesFiltrados.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <Search sx={{ fontSize: 48, mb: 1 }} />
              <Typography>No se encontraron clientes</Typography>
              <Typography variant="body2">Intente con otros términos de búsqueda</Typography>
            </Box>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<Close />}>
          Cancelar
        </Button>
        <Button 
          variant="outlined"
          onClick={() => onSelectCliente(null)}
        >
          Consumidor Final
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientSelector;