// frontend/admin-panel/src/pages/inventory/components/LowStockAlerts.js
import React from 'react';
import { Alert, Box, Typography, Button } from '@mui/material';
import { Warning, Inventory } from '@mui/icons-material';

const LowStockAlerts = ({ lowStockCount, outOfStockCount, products }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {outOfStockCount > 0 && (
        <Alert 
          severity="error" 
          icon={<Warning />}
          action={
            <Button color="inherit" size="small">
              REABASTECER
            </Button>
          }
          sx={{ mb: 2 }}
        >
          <Typography fontWeight="bold">
            {outOfStockCount} producto(s) AGOTADO(S)
          </Typography>
          <Typography variant="body2">
            Urgente: Necesitas reabastecer productos sin stock.
          </Typography>
        </Alert>
      )}
      
      {lowStockCount > 0 && (
        <Alert 
          severity="warning"
          icon={<Inventory />}
          action={
            <Button color="inherit" size="small">
              VER STOCK
            </Button>
          }
        >
          <Typography fontWeight="bold">
            {lowStockCount} producto(s) con STOCK BAJO
          </Typography>
          <Typography variant="body2">
            Revisa y programa reabastecimiento para estos productos.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default LowStockAlerts;