import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box sx={{ mb: 3 }}>
      <MuiBreadcrumbs 
        separator={<NavigateNext fontSize="small" sx={{ color: '#94a3b8' }} />} 
        aria-label="breadcrumb"
      >
        <Link
          component={RouterLink}
          to="/dashboard"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              color: '#2563eb',
            }
          }}
        >
          <Home sx={{ mr: 0.5, fontSize: 18 }} />
          Dashboard
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography 
              key={to} 
              sx={{ 
                color: '#1e293b',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'capitalize'
              }}
            >
              {value.replace(/-/g, ' ')}
            </Typography>
          ) : (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              sx={{ 
                textTransform: 'capitalize', 
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  color: '#2563eb',
                }
              }}
            >
              {value.replace(/-/g, ' ')}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;