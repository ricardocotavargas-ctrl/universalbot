// frontend/admin-panel/src/pages/sales/components/CustomerHistory.js
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box,
  Typography, Chip, Divider, Avatar
} from '@mui/material';
import { Person, Receipt, CalendarToday, AttachMoney } from '@mui/icons-material';

const CustomerHistory = ({ client, open, onClose, salesHistory }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>
            <Person />
          </Avatar>
          <Box>
            <Typography variant="h6">Historial de Compras</Typography>
            <Typography variant="body2" color="text.secondary">
              {client?.nombre} - {client?.documento}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Resumen del cliente */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Resumen del Cliente</Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box>
              <Typography variant="body2">Total Compras</Typography>
              <Typography variant="h6" color="primary">
                {formatCurrency(salesHistory.reduce((sum, sale) => sum + sale.total, 0))}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">Total Ventas</Typography>
              <Typography variant="h6">{salesHistory.length}</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Cliente desde</Typography>
              <Typography variant="body2">
                {formatDate(client?.fechaRegistro || '2024-01-01')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Historial de compras */}
        <Typography variant="h6" gutterBottom>Últimas Compras</Typography>
        {salesHistory.slice(0, 10).map((sale, index) => (
          <Box key={sale.id} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Receipt color="action" />
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {sale.documentNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(sale.fecha)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1" fontWeight="bold">
                  {formatCurrency(sale.total)}
                </Typography>
                <Chip
                  label={sale.tipoDocumento}
                  size="small"
                  color={sale.tipoDocumento === 'factura' ? 'primary' : 'default'}
                />
              </Box>
            </Box>
            {index < salesHistory.length - 1 && <Divider sx={{ mt: 1 }} />}
          </Box>
        ))}

        {salesHistory.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Receipt sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              No hay historial de compras para este cliente
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerHistory;