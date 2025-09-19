import React from 'react';
import { AppBar, Toolbar, Typography, Box, Chip } from '@mui/material';
import { Logout, Business, AccountCircle } from '@mui/icons-material';
import BusinessSelector from './BusinessSelector';

const ClientHeader = ({ 
  client, 
  businesses, 
  selectedBusiness, 
  onBusinessChange, 
  onLogout 
}) => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        {/* Logo y título */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mr: 3 }}>
            🤖 Mi Panel
          </Typography>
          
          {/* Selector de negocio */}
          {businesses.length > 1 && (
            <BusinessSelector
              businesses={businesses}
              selectedBusiness={selectedBusiness}
              onBusinessChange={onBusinessChange}
            />
          )}
          
          {businesses.length === 1 && (
            <Chip
              icon={<Business />}
              label={businesses[0].name}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            />
          )}
        </Box>

        {/* Info del cliente */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {client?.name}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {client?.email}
            </Typography>
          </Box>
          
          <AccountCircle sx={{ fontSize: 32 }} />
          
          <Chip
            icon={<Logout />}
            label="Salir"
            onClick={onLogout}
            variant="outlined"
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ClientHeader;