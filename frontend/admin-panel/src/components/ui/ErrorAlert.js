import React from 'react';
import {
  Alert,
  Button,
  Box
} from '@mui/material';

const ErrorAlert = ({ error, onRetry, message = "Ocurrió un error" }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Alert 
        severity="error" 
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Reintentar
            </Button>
          )
        }
      >
        {message}: {error}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;