// frontend/admin-panel/src/components/layout/BreadcrumbNavigation.js
import React from 'react';
import { Breadcrumbs, Link, Typography, Box, Button } from '@mui/material';
import { NavigateNext, Home, ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BreadcrumbNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (path) => {
    const breadcrumbMap = {
      'dashboard': 'Dashboard',
      'admin': 'Administración',
      'plans': 'Planes',
      'client-plans': 'Asignar Planes',
      'messages': 'Mensajes',
      'customers': 'Clientes',
      'analytics': 'Analytics',
      'settings': 'Configuración'
    };
    return breadcrumbMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
      <Box>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          <Link
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '14px',
              '&:hover': { 
                color: 'primary.main',
                textDecoration: 'none'
              }
            }}
          >
            <Home sx={{ mr: 0.5, fontSize: 18 }} />
            Inicio
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return last ? (
              <Typography key={to} color="text.primary" sx={{ fontSize: '14px', fontWeight: 600 }}>
                {getBreadcrumbName(value)}
              </Typography>
            ) : (
              <Link
                key={to}
                color="inherit"
                onClick={() => navigate(to)}
                sx={{ 
                  cursor: 'pointer',
                  fontSize: '14px',
                  '&:hover': { 
                    color: 'primary.main',
                    textDecoration: 'none'
                  }
                }}
              >
                {getBreadcrumbName(value)}
              </Link>
            );
          })}
        </Breadcrumbs>
        
        <Typography variant="h4" sx={{ 
          fontWeight: 800,
          mt: 1,
          background: location.pathname.includes('/admin/') ? 
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
            'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {getBreadcrumbName(pathnames[pathnames.length - 1])}
        </Typography>
      </Box>

      {pathnames.length > 1 && (
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          variant="outlined"
          size="small"
        >
          Volver
        </Button>
      )}
    </Box>
  );
};

export default BreadcrumbNavigation;