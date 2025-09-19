import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Add,
  MoreVert,
  Search,
  FilterList,
  Download,
  ViewModule,
  ViewList
} from '@mui/icons-material';
import PremiumCard from '../ui/PremiumCard';
import GradientButton from '../ui/GradientButton';

const BusinessManager = ({ businesses, onEdit, onDelete, onCreate }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchor, setFilterAnchor] = useState(null);

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      {/* Header de Acciones */}
      <PremiumCard
        sx={{ mb: 3, p: 3 }}
        action={
          <GradientButton startIcon={<Add />} onClick={onCreate}>
            Nueva Empresa
          </GradientButton>
        }
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            🏢 Gestión de Empresas
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
            
            <IconButton onClick={(e) => setFilterAnchor(e.currentTarget)}>
              <FilterList />
            </IconButton>
            
            <IconButton onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
              {viewMode === 'grid' ? <ViewList /> : <ViewModule />}
            </IconButton>
            
            <IconButton>
              <Download />
            </IconButton>
          </Box>
        </Box>
      </PremiumCard>

      {/* Grid de Empresas */}
      <Grid container spacing={3}>
        {filteredBusinesses.map((business) => (
          <Grid item xs={12} md={6} lg={4} key={business.id}>
            <BusinessCard 
              business={business} 
              onEdit={onEdit}
              onDelete={onDelete}
              viewMode={viewMode}
            />
          </Grid>
        ))}
      </Grid>

      {/* Menú de Filtros */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
      >
        <MenuItem>Todas las industrias</MenuItem>
        <MenuItem>Solo activas</MenuItem>
        <MenuItem>Con integración WhatsApp</MenuItem>
      </Menu>
    </Box>
  );
};

export default BusinessManager;