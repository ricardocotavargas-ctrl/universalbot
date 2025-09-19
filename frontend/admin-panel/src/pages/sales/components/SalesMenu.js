import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import {
  PointOfSale, History, Dashboard, People,
  AccountBalance, AssignmentReturn, Security,
  CalendarToday, LocalOffer, QrCodeScanner,
  TrendingUp, Inventory, Receipt
} from '@mui/icons-material';

const SalesMenu = ({ onSelectModule }) => {
  const modulos = [
    { id: 'venta', label: 'Punto de Venta', icon: <PointOfSale /> },
    { id: 'rapida', label: 'Venta Rápida', icon: <QrCodeScanner /> },
    { id: 'cierre', label: 'Cierre de Caja', icon: <AccountBalance /> },
    { id: 'devoluciones', label: 'Devoluciones', icon: <AssignmentReturn /> },
    { id: 'reservas', label: 'Reservas', icon: <CalendarToday /> },
    { id: 'promociones', label: 'Promociones', icon: <LocalOffer /> },
    { id: 'comisiones', label: 'Comisiones', icon: <TrendingUp /> },
    { id: 'turnos', label: 'Turnos', icon: <Receipt /> },
    { id: 'validaciones', label: 'Validaciones', icon: <Security /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { id: 'clientes', label: 'Clientes', icon: <People /> },
    { id: 'historial', label: 'Historial', icon: <History /> },
    { id: 'auditoria', label: 'Auditoría', icon: <Security /> },
    { id: 'permisos', label: 'Permisos', icon: <Security /> }
  ];

  return (
    <Grid container spacing={2}>
      {modulos.map((modulo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={modulo.id}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={modulo.icon}
            onClick={() => onSelectModule(modulo.id)}
            sx={{ 
              height: 100, 
              flexDirection: 'column',
              fontSize: '0.8rem'
            }}
          >
            {modulo.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default SalesMenu;