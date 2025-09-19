import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3b82f6' },
    background: { 
      default: '#0f172a',
      paper: '#1e293b'
    }
  }
});

// En App.js agregar toggle de tema