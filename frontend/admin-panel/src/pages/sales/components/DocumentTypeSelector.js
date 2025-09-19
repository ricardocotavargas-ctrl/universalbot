// frontend/admin-panel/src/pages/sales/components/DocumentTypeSelector.js
import React from 'react';
import { TextField, MenuItem, Box, Typography } from '@mui/material';
import { Receipt, Description } from '@mui/icons-material';

const DocumentTypeSelector = ({ value, onChange }) => {
  const documentTypes = [
    { 
      value: 'factura', 
      label: 'Factura', 
      description: 'Documento fiscal con impuestos',
      icon: <Receipt />
    },
    { 
      value: 'nota_entrega', 
      label: 'Nota de Entrega', 
      description: 'Documento de entrega sin impuestos',
      icon: <Description />
    }
  ];

  return (
    <TextField
      select
      label="Tipo de Documento"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ minWidth: 200 }}
      SelectProps={{
        renderValue: (selected) => {
          const selectedType = documentTypes.find(type => type.value === selected);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {selectedType.icon}
              {selectedType.label}
            </Box>
          );
        }
      }}
    >
      {documentTypes.map((type) => (
        <MenuItem key={type.value} value={type.value}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {type.icon}
            <Box>
              <Typography variant="body1">{type.label}</Typography>
              <Typography variant="caption" color="text.secondary">
                {type.description}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DocumentTypeSelector;