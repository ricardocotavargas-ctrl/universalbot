import React, { useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import SalesMenu from './SalesMenu';
import NewSale from '../NewSale';
import QuickSale from './QuickSale';
import CierreCaja from './CierreCaja';
import Devoluciones from './Devoluciones';
import SalesReservations from './SalesReservations';
import SalesPromotions from './SalesPromotions';
import SalesCommissions from './SalesCommissions';
import SalesShiftManager from './SalesShiftManager';
import SalesValidations from './SalesValidations';
import SalesDashboard from './SalesDashboard';
import CustomerDatabase from '../CustomerDatabase';
import SalesHistory from '../SalesHistory';
import SalesAudit from './SalesAudit';
import SalesPermissions from './SalesPermissions';

const SalesLayout = () => {
  const [moduloActivo, setModuloActivo] = useState('venta');

  const renderModulo = () => {
    switch (moduloActivo) {
      case 'venta': return <NewSale />;
      case 'rapida': return <QuickSale />;
      case 'cierre': return <CierreCaja />;
      case 'devoluciones': return <Devoluciones />;
      case 'reservas': return <SalesReservations />;
      case 'promociones': return <SalesPromotions />;
      case 'comisiones': return <SalesCommissions />;
      case 'turnos': return <SalesShiftManager />;
      case 'validaciones': return <SalesValidations />;
      case 'dashboard': return <SalesDashboard />;
      case 'clientes': return <CustomerDatabase />;
      case 'historial': return <SalesHistory />;
      case 'auditoria': return <SalesAudit />;
      case 'permisos': return <SalesPermissions />;
      default: return <NewSale />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom>
          Sistema de Ventas Universal
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <SalesMenu onSelectModule={setModuloActivo} />
        </Paper>

        {renderModulo()}
      </Box>
    </Container>
  );
};

export default SalesLayout;