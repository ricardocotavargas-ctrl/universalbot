import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6366f1' : '#818cf8',
      },
      secondary: {
        main: mode === 'light' ? '#8b5cf6' : '#a78bfa',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#1f2937',
        paper: mode === 'light' ? '#ffffff' : '#374151',
      },
    },
  }), [mode]);

  const value = {
    mode,
    toggleTheme,
    isDark: mode === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};