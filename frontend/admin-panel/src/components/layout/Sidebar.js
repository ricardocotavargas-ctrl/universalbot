// frontend/admin-panel/src/components/layout/Sidebar.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import navigationConfig from '../../utils/navigationConfig';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState({});

  // Auto-abrir grupos relevantes basado en la ruta actual
  useEffect(() => {
    const currentPath = location.pathname;
    const newOpenGroups = {};
    
    const checkShouldOpen = (items, parentLabel = null) => {
      for (const item of items) {
        if (item.path && currentPath.startsWith(item.path)) {
          if (parentLabel) {
            newOpenGroups[parentLabel] = true;
          }
          return true;
        }
        if (item.items && checkShouldOpen(item.items, item.label)) {
          if (parentLabel) {
            newOpenGroups[parentLabel] = true;
          }
          newOpenGroups[item.label] = true;
          return true;
        }
      }
      return false;
    };

    navigationConfig.main.forEach(item => {
      if (item.items) {
        checkShouldOpen(item.items, item.label);
      }
    });

    setOpenGroups(newOpenGroups);
  }, [location.pathname]);

  const handleGroupToggle = (label) => {
    setOpenGroups(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleItemClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const isItemActive = (item) => {
    if (!item.path) return false;
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const renderNavigationItem = (item, depth = 0) => {
    const isActive = isItemActive(item);
    const isGroupOpen = openGroups[item.label];
    const hasItems = item.items && item.items.length > 0;

    const baseStyles = {
      minHeight: 44,
      justifyContent: 'initial',
      px: 2,
      pl: depth * 2 + 2,
      margin: '0.1rem 0.5rem',
      borderRadius: '8px',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      }
    };

    const activeStyles = isActive ? {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16)
      }
    } : {};

    if (item.type === 'group' || item.type === 'subgroup') {
      return (
        <Box key={item.label}>
          <ListItemButton
            onClick={() => handleGroupToggle(item.label)}
            sx={{
              ...baseStyles,
              ...(isGroupOpen ? activeStyles : {})
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                justifyContent: 'center',
                color: (isActive || isGroupOpen) ? theme.palette.primary.main : alpha('#64748b', 0.8)
              }}
            >
              {item.icon && <item.icon sx={{ fontSize: 20 }} />}
            </ListItemIcon>
            
            <ListItemText 
              primary={item.label} 
              sx={{ 
                '& .MuiTypography-root': {
                  fontWeight: (isActive || isGroupOpen) ? 600 : 500,
                  color: (isActive || isGroupOpen) ? theme.palette.primary.main : '#374151',
                  fontSize: '0.9rem'
                }
              }}
            />
            
            {hasItems && (
              isGroupOpen ? (
                <ExpandLess sx={{ fontSize: 18, color: '#64748b' }} />
              ) : (
                <ExpandMore sx={{ fontSize: 18, color: '#64748b' }} />
              )
            )}
          </ListItemButton>

          {hasItems && (
            <Collapse in={isGroupOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ 
                pl: item.type === 'subgroup' ? 0 : 2,
                borderLeft: item.type === 'subgroup' ? `2px solid ${alpha(theme.palette.primary.main, 0.1)}` : 'none',
                ml: item.type === 'subgroup' ? 2 : 0
              }}>
                {item.items.map(subItem => renderNavigationItem(subItem, depth + 1))}
              </List>
            </Collapse>
          )}
        </Box>
      );
    }

    // Item normal
    return (
      <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() => handleItemClick(item.path)}
          sx={{
            ...baseStyles,
            ...activeStyles
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 2,
              justifyContent: 'center',
              color: isActive ? theme.palette.primary.main : alpha('#64748b', 0.8)
            }}
          >
            {item.icon && <item.icon sx={{ fontSize: 20 }} />}
          </ListItemIcon>
          
          <ListItemText 
            primary={item.label} 
            sx={{ 
              '& .MuiTypography-root': {
                fontWeight: isActive ? 600 : 400,
                color: isActive ? theme.palette.primary.main : '#374151',
                fontSize: '0.9rem'
              }
            }}
          />
          
          {isActive && (
            <ChevronRight sx={{ fontSize: 16, color: theme.palette.primary.main }} />
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      background: '#ffffff',
      py: 2
    }}>
      {/* Header del Sidebar */}
      <Box sx={{ 
        px: 4, 
        pb: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography 
          variant="h6" 
          fontWeight={400} 
          fontSize="0.80rem" 
          color="#1f293746"
          sx={{
            textAlign: 'start',
            width: '100%'
          }}
        >
          MÓDULOS
        </Typography>
      </Box>

      {/* Navegación */}
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha('#6366f1', 0.3),
          borderRadius: '2px'
        }
      }}>
        <List sx={{ p: 1 }}>
          {navigationConfig.main.map(item => renderNavigationItem(item))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;