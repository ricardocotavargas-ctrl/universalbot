import React, { useState } from 'react';
import {
  Paper, Typography, TableContainer, Table, TableHead, TableBody,
  TableRow, TableCell, IconButton, Chip, Box, Avatar, Tooltip,
  TablePagination, TextField, InputAdornment, Menu, MenuItem,
  Button, useTheme
} from '@mui/material';
import {
  Edit, Delete, Visibility, FilterList, Search,
  Sort, Business, TrendingUp, People
} from '@mui/icons-material';

const BusinessTable = ({ 
  businesses = [], 
  onEdit, 
  onDelete, 
  onView,
  onIndustryFilter,
  onStatusFilter
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  const industries = ['ecommerce', 'healthcare', 'education', 'restaurant', 'realestate', 'services', 'technology', 'finance', 'logistics', 'other'];
  const statuses = ['active', 'pending', 'inactive'];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || business.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const sortedBusinesses = filteredBusinesses.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'revenue' || sortField === 'customers') {
      aValue = Number(aValue) || 0;
      bValue = Number(bValue) || 0;
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedBusinesses = sortedBusinesses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getIndustryColor = (industry) => {
    const colors = {
      ecommerce: 'primary',
      healthcare: 'error',
      education: 'warning',
      restaurant: 'success',
      realestate: 'info',
      services: 'secondary',
      technology: 'primary',
      finance: 'success',
      logistics: 'info',
      other: 'default'
    };
    return colors[industry] || 'default';
  };

  const getIndustryIcon = (industry) => {
    const icons = {
      ecommerce: '🛒',
      healthcare: '🏥',
      education: '🎓',
      restaurant: '🍽️',
      realestate: '🏠',
      services: '🔧',
      technology: '💻',
      finance: '💰',
      logistics: '🚚',
      other: '🏢'
    };
    return icons[industry] || '🏢';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      pending: 'warning',
      inactive: 'error'
    };
    return colors[status] || 'default';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount || 0);
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header con controles */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
          <Business sx={{ mr: 1, color: 'primary.main' }} />
          Gestión de Empresas
          <Chip 
            label={`${filteredBusinesses.length} empresas`} 
            size="small" 
            color="primary"
            variant="outlined"
            sx={{ ml: 2 }}
          />
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {/* Buscador */}
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
            sx={{ width: 250 }}
          />

          {/* Filtros */}
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={handleFilterClick}
            size="small"
          >
            Filtros
          </Button>

          <Menu
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={handleFilterClose}
          >
            <MenuItem>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Filtrar por Industria
              </Typography>
            </MenuItem>
            {['all', ...industries].map(industry => (
              <MenuItem
                key={industry}
                selected={industryFilter === industry}
                onClick={() => {
                  setIndustryFilter(industry);
                  onIndustryFilter?.(industry);
                  handleFilterClose();
                }}
              >
                {industry === 'all' ? 'Todas las industrias' : `${getIndustryIcon(industry)} ${industry}`}
              </MenuItem>
            ))}
            
            <MenuItem sx={{ borderTop: `1px solid ${theme.palette.divider}`, mt: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Filtrar por Estado
              </Typography>
            </MenuItem>
            {['all', ...statuses].map(status => (
              <MenuItem
                key={status}
                selected={statusFilter === status}
                onClick={() => {
                  setStatusFilter(status);
                  onStatusFilter?.(status);
                  handleFilterClose();
                }}
              >
                {status === 'all' ? 'Todos los estados' : status}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* Tabla */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Empresa
                  <IconButton size="small" onClick={() => handleSort('name')}>
                    <Sort sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>Industria</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  Ingresos
                  <IconButton size="small" onClick={() => handleSort('revenue')}>
                    <Sort sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  Clientes
                  <IconButton size="small" onClick={() => handleSort('customers')}>
                    <Sort sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>Crecimiento</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBusinesses.map((business) => (
              <TableRow key={business.id} hover>
                {/* Logo y Nombre */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {business.config?.logo ? (
                      <Avatar src={business.config.logo} sx={{ width: 40, height: 40 }} />
                    ) : (
                      <Avatar sx={{ 
                        bgcolor: theme.palette[getIndustryColor(business.industry)]?.main,
                        width: 40, 
                        height: 40 
                      }}>
                        {getIndustryIcon(business.industry)}
                      </Avatar>
                    )}
                    <Box>
                      <Typography fontWeight="bold" variant="body2">
                        {business.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {business.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* Industria */}
                <TableCell>
                  <Chip 
                    label={business.industry} 
                    size="small"
                    color={getIndustryColor(business.industry)}
                    variant="outlined"
                  />
                </TableCell>

                {/* Ingresos */}
                <TableCell align="right">
                  <Typography fontWeight="bold" color="primary">
                    {formatCurrency(business.revenue)}
                  </Typography>
                </TableCell>

                {/* Clientes */}
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                    <People sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography fontWeight="bold">
                      {business.customers || 0}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Crecimiento */}
                <TableCell>
                  <Chip 
                    icon={<TrendingUp />}
                    label={business.monthlyGrowth || '+0%'} 
                    size="small" 
                    color="success"
                    variant="filled"
                  />
                </TableCell>

                {/* Estado */}
                <TableCell>
                  <Chip
                    label={business.status}
                    size="small"
                    color={getStatusColor(business.status)}
                    variant="filled"
                  />
                </TableCell>

                {/* Acciones */}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Ver detalles">
                      <IconButton 
                        size="small"
                        color="info"
                        onClick={() => onView?.(business)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Editar empresa">
                      <IconButton 
                        size="small"
                        color="primary"
                        onClick={() => onEdit?.(business)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Eliminar empresa">
                      <IconButton 
                        size="small"
                        color="error"
                        onClick={() => onDelete?.(business.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBusinesses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage="Empresas por página:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} de ${count} empresas`
        }
      />
    </Paper>
  );
};

export default BusinessTable;