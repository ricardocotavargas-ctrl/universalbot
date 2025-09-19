import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BusinessProvider } from './contexts/BusinessContext';
import { AuthProvider } from './contexts/AuthContext';

// Datos de ejemplo - luego vendrán de tu base de datos
const demoBusinesses = [
  {
    id: 1,
    name: "Tech Solutions Corp",
    industry: "technology",
    config: { 
      colors: { primary: '#2563eb', secondary: '#8b5cf6' },
      logo: null
    }
  },
  {
    id: 2,
    name: "Academia Excelencia", 
    industry: "education",
    config: { 
      colors: { primary: '#16a34a', secondary: '#84cc16' },
      logo: null
    }
  }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BusinessProvider userBusinesses={demoBusinesses}>
        <App />
      </BusinessProvider>
    </AuthProvider>
  </React.StrictMode>
);