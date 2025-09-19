import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { Business } from '@mui/icons-material';

const BusinessSelector = ({ businesses, selectedBusiness, onBusinessChange }) => {
  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Seleccionar Negocio</InputLabel>
        <Select
          value={selectedBusiness?.id || ''}
          label="Seleccionar Negocio"
          onChange={(e) => {
            const business = businesses.find(b => b.id === e.target.value);
            onBusinessChange(business);
          }}
          startAdornment={<Business sx={{ mr: 1, color: 'text.secondary' }} />}
        >
          {businesses.map((business) => (
            <MenuItem key={business.id} value={business.id}>
              {business.name} - {business.industry}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BusinessSelector;