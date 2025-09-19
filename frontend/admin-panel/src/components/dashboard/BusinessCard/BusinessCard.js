import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  MoreVert,
  WhatsApp,
  Facebook,
  Instagram,
  Edit,
  Delete
} from '@mui/icons-material';
import PremiumCard from '../ui/PremiumCard';

const BusinessCard = ({ business, onEdit, onDelete, viewMode }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getIndustryIcon = (industry) => {
    const icons = {
      ecommerce: '🛒',
      healthcare: '🏥',
      education: '🎓',
      restaurant: '🍽️',
      automotive: '🔧',
      default: '🏢'
    };
    return icons[industry] || icons.default;
  };

  return (
    <PremiumCard
      sx={{
        height: viewMode === 'grid' ? '100%' : 'auto',
        transition: 'all 0.3s ease'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            bgcolor: 'primary.main',
            fontSize: '1.5rem'
          }}
        >
          {getIndustryIcon(business.industry)}
        </Avatar>
        
        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
          <MoreVert />
        </IconButton>
      </Box>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {business.name}
      </Typography>
      
      <Chip 
        label={business.industry} 
        size="small" 
        sx={{ mb: 2 }}
      />

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            {business.customers || 0}
          </Typography>
          <Typography variant="caption">Clientes</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            {business.revenue ? `$${business.revenue}` : '$0'}
          </Typography>
          <Typography variant="caption">Ingresos</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            {business.monthlyGrowth || '+0%'}
          </Typography>
          <Typography variant="caption">Crecimiento</Typography>
        </Box>
      </Box>

      {/* Integraciones */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {business.integrations?.whatsapp && (
          <Chip icon={<WhatsApp />} label="WhatsApp" size="small" color="success" />
        )}
        {business.integrations?.facebook && (
          <Chip icon={<Facebook />} label="Facebook" size="small" color="primary" />
        )}
        {business.integrations?.instagram && (
          <Chip icon={<Instagram />} label="Instagram" size="small" color="secondary" />
        )}
      </Box>

      {/* Menú de Acciones */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => { onEdit(business); setMenuAnchor(null); }}>
          <Edit sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={() => { onDelete(business.id); setMenuAnchor(null); }}>
          <Delete sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>
    </PremiumCard>
  );
};

export default BusinessCard;