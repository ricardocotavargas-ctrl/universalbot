import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, IconButton,
  Box, Typography, Alert
} from '@mui/material';
import {
  Visibility, Edit, Delete, Person, Business
} from '@mui/icons-material';
import { api } from '../../utils/api';

const ClientsManager = ({ open, onClose }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (open) {
      loadClients();
    }
  }, [open]);

  const loadClients = async () => {
    setLoading(true);
    try {
      const clientsData = await api.get('/api/clients');
      setClients(clientsData);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : status === 'suspended' ? 'error' : 'warning';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Person sx={{ mr: 2 }} />
          Gestión de Clientes
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Administra todos los clientes registrados en la plataforma
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Empresas</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Registro</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Box>
                      <Typography fontWeight="bold">
                        {client.first_name} {client.last_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {client.company_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography>{client.email}</Typography>
                      <Typography variant="body2">{client.phone}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      {client.businesses?.map((business) => (
                        <Chip
                          key={business.id}
                          icon={<Business />}
                          label={business.name}
                          size="small"
                          variant="outlined"
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={client.status}
                      color={getStatusColor(client.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(client.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button variant="contained" onClick={loadClients}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientsManager;