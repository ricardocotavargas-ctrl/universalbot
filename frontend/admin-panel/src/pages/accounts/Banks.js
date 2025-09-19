import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton,
  Alert, LinearProgress, Tabs, Tab, Avatar, Tooltip, FormControlLabel, Switch
} from '@mui/material';
import {
  AccountBalance, Add, Edit, Delete, Visibility, CompareArrows,
  Download, AccountBalanceWallet, CurrencyExchange, Security,
  QrCode, ContentCopy, CheckCircle, Error as ErrorIcon
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Banks = () => {
  const [accounts, setAccounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copiedField, setCopiedField] = useState(null);

  // Datos de ejemplo para cuentas bancarias
  const mockAccounts = [
    {
      id: 1,
      bankName: 'Banco de Venezuela',
      accountNumber: '0102-1234-5678-9012-3456',
      accountType: 'corriente',
      currency: 'VES',
      balance: 1250000,
      availableBalance: 1200000,
      holder: 'Mi Empresa C.A.',
      rif: 'J-123456789',
      email: 'contabilidad@miempresa.com',
      phone: '+58-412-555-1234',
      status: 'active',
      lastTransaction: '2024-05-20',
      isPrimary: true,
      swiftCode: 'BDVZVECA',
      iban: 'VE123456789012345678901234'
    },
    {
      id: 2,
      bankName: 'Banesco',
      accountNumber: '0134-5678-9012-3456-7890',
      accountType: 'ahorro',
      currency: 'VES',
      balance: 85000,
      availableBalance: 85000,
      holder: 'Mi Empresa C.A.',
      rif: 'J-123456789',
      email: 'contabilidad@miempresa.com',
      phone: '+58-414-555-5678',
      status: 'active',
      lastTransaction: '2024-05-19',
      isPrimary: false,
      swiftCode: 'BNCOVEVC',
      iban: 'VE987654321098765432109876'
    },
    {
      id: 3,
      bankName: 'Mercantil',
      accountNumber: '0105-2468-1357-9246-8024',
      accountType: 'corriente',
      currency: 'VES',
      balance: 150000,
      availableBalance: 145000,
      holder: 'Mi Empresa C.A.',
      rif: 'J-123456789',
      email: 'contabilidad@miempresa.com',
      phone: '+58-416-555-9012',
      status: 'inactive',
      lastTransaction: '2024-04-15',
      isPrimary: false,
      swiftCode: 'MERCVECC',
      iban: 'VE2468135792468024681357'
    }
  ];

  const bankLogos = {
    'Banco de Venezuela': 'BDV',
    'Banesco': 'BAN',
    'Mercantil': 'MER',
    'Provincial': 'PRO',
    'Venezuela': 'VEN',
    'Bancaribe': 'CAR'
  };

  useEffect(() => {
    setAccounts(mockAccounts);
  }, []);

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'USD' ? 2 : 0,
      maximumFractionDigits: currency === 'USD' ? 2 : 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'corriente': return 'primary';
      case 'ahorro': return 'success';
      case 'dólares': return 'warning';
      default: return 'default';
    }
  };

  const getAccountTypeText = (type) => {
    switch (type) {
      case 'corriente': return 'Corriente';
      case 'ahorro': return 'Ahorro';
      case 'dólares': return 'Dólares';
      default: return type;
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Activa' : 'Inactiva';
  };

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const availableBalance = accounts.reduce((sum, account) => sum + account.availableBalance, 0);
  const activeAccounts = accounts.filter(account => account.status === 'active').length;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Cuentas Bancarias
        </Typography>
        <Typography color="text.secondary">
          Administra y monitorea todas las cuentas bancarias de tu empresa
        </Typography>
      </Box>

      {/* Alertas Importantes */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight="bold">
          💡 Recuerda conciliar tus cuentas regularmente para mantener la precisión financiera
        </Typography>
      </Alert>

      {/* KPIs Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Balance Total</Typography>
              </Box>
              <Typography variant="h4">
                {formatCurrency(totalBalance)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={75}
                color="primary"
                sx={{ mt: 2, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CurrencyExchange color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Disponible</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {formatCurrency(availableBalance)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {((availableBalance / totalBalance) * 100).toFixed(1)}% del total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Cuentas Activas</Typography>
              </Box>
              <Typography variant="h4">
                {activeAccounts} / {accounts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {accounts.length - activeAccounts} cuenta(s) inactiva(s)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<AccountBalance />} label="Todas las Cuentas" />
            <Tab icon={<CompareArrows />} label="Conciliación" />
            <Tab icon={<Download />} label="Reportes" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
              >
                Agregar Cuenta
              </Button>
              
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Filtrar por</InputLabel>
                <Select label="Filtrar por">
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="active">Activas</MenuItem>
                  <MenuItem value="inactive">Inactivas</MenuItem>
                  <MenuItem value="primary">Principal</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Moneda</InputLabel>
                <Select label="Moneda">
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="VES">VES</MenuItem>
                </Select>
              </FormControl>
              
              <Button variant="outlined" startIcon={<Download />}>
                Exportar
              </Button>
            </Box>

            <Grid container spacing={3}>
              {accounts.map((account) => (
                <Grid item xs={12} md={6} lg={4} key={account.id}>
                  <Card sx={{ 
                    border: account.isPrimary ? 2 : 1,
                    borderColor: account.isPrimary ? 'primary.main' : 'divider'
                  }}>
                    <CardContent>
                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ 
                            bgcolor: 'primary.main', 
                            width: 40, 
                            height: 40,
                            mr: 2,
                            fontWeight: 'bold'
                          }}>
                            {bankLogos[account.bankName] || account.bankName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">{account.bankName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {account.accountNumber}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ textAlign: 'right' }}>
                          {account.isPrimary && (
                            <Chip label="Principal" color="primary" size="small" sx={{ mb: 1 }} />
                          )}
                          <Chip
                            label={getStatusText(account.status)}
                            color={getStatusColor(account.status)}
                            size="small"
                          />
                        </Box>
                      </Box>

                      {/* Balance Info */}
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 2,
                        mb: 2 
                      }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Balance Total
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                          {formatCurrency(account.balance, account.currency)}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          Disponible: {formatCurrency(account.availableBalance, account.currency)}
                        </Typography>
                        
                        {account.balance !== account.availableBalance && (
                          <LinearProgress
                            variant="determinate"
                            value={(account.availableBalance / account.balance) * 100}
                            color="success"
                            sx={{ mt: 1, height: 6, borderRadius: 3 }}
                          />
                        )}
                      </Box>

                      {/* Account Details */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Tipo:</Typography>
                          <Chip
                            label={getAccountTypeText(account.accountType)}
                            color={getAccountTypeColor(account.accountType)}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Moneda:</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {account.currency}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Última transacción:</Typography>
                          <Typography variant="body2">
                            {formatDate(account.lastTransaction)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Actions */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Ver detalles">
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Editar cuenta">
                          <IconButton 
                            size="small" 
                            color="warning"
                            onClick={() => {
                              setEditingAccount(account);
                              setOpenDialog(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Conciliar">
                          <IconButton size="small" color="info">
                            <CompareArrows />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Eliminar cuenta">
                          <IconButton size="small" color="error" disabled={account.isPrimary}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Quick Actions */}
                      {account.status === 'active' && (
                        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Button variant="outlined" size="small" fullWidth>
                            Transferir
                          </Button>
                          <Button variant="outlined" size="small" fullWidth>
                            Estado de Cuenta
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Conciliación Bancaria
            </Typography>
            <Typography color="text.secondary" paragraph>
              Compara tus registros con los estados de cuenta bancarios
            </Typography>
            {/* Aquí iría el componente de conciliación */}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Reportes Bancarios
            </Typography>
            <Typography color="text.secondary" paragraph>
              Genera reportes detallados de tus cuentas bancarias
            </Typography>
            {/* Aquí iría el componente de reportes */}
          </Box>
        )}
      </UBCard>

      {/* Diálogo para agregar/editar cuenta */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingAccount ? 'Editar Cuenta Bancaria' : 'Nueva Cuenta Bancaria'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Banco</InputLabel>
                <Select label="Banco" defaultValue={editingAccount?.bankName || ''}>
                  <MenuItem value="Banco de Venezuela">Banco de Venezuela</MenuItem>
                  <MenuItem value="Banesco">Banesco</MenuItem>
                  <MenuItem value="Mercantil">Mercantil</MenuItem>
                  <MenuItem value="Provincial">Provincial</MenuItem>
                  <MenuItem value="Venezuela">Banco Venezuela</MenuItem>
                  <MenuItem value="Bancaribe">Bancaribe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Cuenta"
                defaultValue={editingAccount?.accountNumber || ''}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Cuenta</InputLabel>
                <Select label="Tipo de Cuenta" defaultValue={editingAccount?.accountType || 'corriente'}>
                  <MenuItem value="corriente">Corriente</MenuItem>
                  <MenuItem value="ahorro">Ahorro</MenuItem>
                  <MenuItem value="dólares">Dólares</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Moneda</InputLabel>
                <Select label="Moneda" defaultValue={editingAccount?.currency || 'USD'}>
                  <MenuItem value="USD">USD - Dólares</MenuItem>
                  <MenuItem value="VES">VES - Bolívares</MenuItem>
                  <MenuItem value="EUR">EUR - Euros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Titular de la Cuenta"
                defaultValue={editingAccount?.holder || ''}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="RIF del Titular"
                defaultValue={editingAccount?.rif || ''}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SWIFT/BIC"
                defaultValue={editingAccount?.swiftCode || ''}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IBAN"
                defaultValue={editingAccount?.iban || ''}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email de Contacto"
                type="email"
                defaultValue={editingAccount?.email || ''}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono de Contacto"
                defaultValue={editingAccount?.phone || ''}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked={editingAccount?.isPrimary || false} />}
                label="Establecer como cuenta principal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked={editingAccount?.status === 'active' || true} />}
                label="Cuenta activa"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenDialog(false);
            setEditingAccount(null);
          }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => {
            setOpenDialog(false);
            setEditingAccount(null);
          }}>
            {editingAccount ? 'Actualizar' : 'Crear'} Cuenta
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Banks;