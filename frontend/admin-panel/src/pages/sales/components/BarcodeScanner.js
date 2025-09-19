// frontend/admin-panel/src/pages/sales/components/BarcodeScanner.js
import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, IconButton, Box, Typography } from '@mui/material';
import { QrCodeScanner, CameraAlt } from '@mui/icons-material';

const BarcodeScanner = ({ onScan, continuous = true }) => {
  const [isActive, setIsActive] = useState(continuous);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleInput = (value) => {
    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Si el valor tiene más de 3 caracteres, asumimos que es un código escaneado
    if (value.length >= 3) {
      onScan(value);
      
      // Limpiar campo después del escaneo (modo continuo)
      if (continuous) {
        timeoutRef.current = setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }, 100);
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    handleInput(value);
  };

  const handleKeyPress = (e) => {
    // Permitir Enter solo si no está en modo continuo
    if (e.key === 'Enter' && !continuous) {
      handleInput(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        inputRef={inputRef}
        fullWidth
        placeholder={isActive ? "Escanee código de barras..." : "Click en el ícono para activar escáner"}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={!isActive}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CameraAlt />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setIsActive(!isActive)}
                color={isActive ? "primary" : "default"}
                size="small"
              >
                <QrCodeScanner />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isActive && continuous && (
        <Typography variant="caption" color="text.secondary">
          Modo continuo activado - Escanee productos sin presionar Enter
        </Typography>
      )}
    </Box>
  );
};

export default BarcodeScanner;