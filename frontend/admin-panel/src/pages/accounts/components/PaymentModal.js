// frontend/admin-panel/src/pages/accounts/components/PaymentModal.js
import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Typography, Box,
  InputAdornment, FormControl, InputLabel, Select,
  MenuItem, Alert, Divider, Chip, Paper
} from '@mui/material';
import {
  AttachMoney, CalendarToday, Receipt, Payment,
  AccountBalance, AccountBalanceWallet, CreditCard,
  TrendingUp, Warning
} from '@mui/icons-material';

const PaymentModal = ({ open, payable, onClose, onSave }) => {
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'transfer',
    reference: '',
    notes: '',
    bankAccount: '',
    currency: 'USD'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (payable) {
      setPaymentData(prev => ({
        ...prev,
        amount: payable.balance,
        currency: payable.currency || 'USD'
      }));
    }
  }, [payable]);

  const validateForm = () => {
    const newErrors = {};

    if (paymentData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }

    if (paymentData.amount > (payable?.balance || 0)) {
      newErrors.amount = 'El monto no puede ser mayor al saldo pendiente';
    }

    if (!paymentData.paymentDate) {
      newErrors.paymentDate = 'La fecha de pago es requerida';
    }

    if (!paymentData.paymentMethod) {
      newErrors.paymentMethod = 'El método de pago es requerido';
    }

    if (['transfer', 'deposit'].includes(paymentData.paymentMethod) && !paymentData.reference) {
      newErrors.reference = 'La referencia es requerida para este método de pago';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({
        ...paymentData,
        payableId: payable.id,
        payableNumber: payable.documentNumber,
        supplier: payable.supplier
      });
      setPaymentData({
        amount: 0,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'transfer',
        reference: '',
        notes: '',
        bankAccount: '',
        currency: 'USD'
      });
    }
  };

  const handleChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: paymentData.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  const paymentMethods = [
    { value: 'transfer', label: 'Transferencia Bancaria', icon: <AccountBalance /> },
    { value: 'deposit', label: 'Depósito', icon: <AccountBalanceWallet /> },
    { value: 'cash', label: 'Efectivo', icon: <AttachMoney /> },
    { value: 'check', label: 'Cheque', icon: <Receipt /> },
    { value: 'credit_card', label: 'Tarjeta de Crédito', icon: <CreditCard /> },
    { value: 'debit_card', label: 'Tarjeta de Débito', icon: <CreditCard /> }
  ];

  const bankAccounts = [
    { value: 'BAN-001', label: 'BNC - 0198-1234-5678-9012' },
    { value: 'BAN-002', label: 'BMR - 0105-9876-5432-1098' },
    { value: 'BAN-003', label: 'BVC - 0134-2468-1357-8024' }
  ];

  if (!payable) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Payment />
          Registrar Pago - {payable.documentNumber}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Información de la Factura */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Información de la Factura
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    <strong>Proveedor:</strong> {payable.supplier}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Descripción:</strong> {payable.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    <strong>Total Factura:</strong> {formatCurrency(payable.amount)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Saldo Pendiente:</strong> 
                    <span style={{ color: payable.balance > 0 ? '#f44336' : '#4caf50' }}>
                      {formatCurrency(payable.balance)}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Vencimiento:</strong> 
                    <Chip
                      label={formatDate(payable.dueDate)}
                      size="small"
                      color={new Date(payable.dueDate) < new Date() ? 'error' : 'default'}
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Detalles del Pago */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Detalles del Pago
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Monto a Pagar *"
              type="number"
              value={paymentData.amount}
              onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
                inputProps: { 
                  min: 0,
                  max: payable.balance,
                  step: "0.01"
                }
              }}
              error={!!errors.amount}
              helperText={errors.amount}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Fecha de Pago *"
              type="date"
              value={paymentData.paymentDate}
              onChange={(e) => handleChange('paymentDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.paymentDate}
              helperText={errors.paymentDate}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.paymentMethod}>
              <InputLabel>Método de Pago *</InputLabel>
              <Select
                value={paymentData.paymentMethod}
                onChange={(e) => handleChange('paymentMethod', e.target.value)}
                label="Método de Pago *"
              >
                {paymentMethods.map(method => (
                  <MenuItem key={method.value} value={method.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {method.icon}
                      {method.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {errors.paymentMethod && (
                <Typography variant="caption" color="error">
                  {errors.paymentMethod}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Moneda</InputLabel>
              <Select
                value={paymentData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                label="Moneda"
              >
                <MenuItem value="USD">USD - Dólares</MenuItem>
                <MenuItem value="VES">VES - Bolívares</MenuItem>
                <MenuItem value="EUR">EUR - Euros</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Campos condicionales según método de pago */}
          {(paymentData.paymentMethod === 'transfer' || paymentData.paymentMethod === 'deposit') && (
            <>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Cuenta Bancaria</InputLabel>
                  <Select
                    value={paymentData.bankAccount}
                    onChange={(e) => handleChange('bankAccount', e.target.value)}
                    label="Cuenta Bancaria"
                  >
                    {bankAccounts.map(account => (
                      <MenuItem key={account.value} value={account.value}>
                        {account.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número de Referencia *"
                  value={paymentData.reference}
                  onChange={(e) => handleChange('reference', e.target.value)}
                  error={!!errors.reference}
                  helperText={errors.reference}
                  placeholder="Número de transferencia o depósito"
                />
              </Grid>
            </>
          )}

          {paymentData.paymentMethod === 'check' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Cheque"
                value={paymentData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
                placeholder="Número del cheque"
              />
            </Grid>
          )}

          {(paymentData.paymentMethod === 'credit_card' || paymentData.paymentMethod === 'debit_card') && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Últimos 4 dígitos de la tarjeta"
                value={paymentData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
                inputProps={{ maxLength: 4 }}
                placeholder="1234"
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notas u Observaciones"
              multiline
              rows={3}
              value={paymentData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Información adicional sobre el pago..."
            />
          </Grid>

          {/* Resumen del Pago */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
              <Typography variant="subtitle1" gutterBottom>
                Resumen del Pago
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>Monto a pagar:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography fontWeight="bold">
                    {formatCurrency(paymentData.amount)}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Nuevo saldo:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography fontWeight="bold" color={
                    payable.balance - paymentData.amount > 0 ? 'warning.main' : 'success.main'
                  }>
                    {formatCurrency(payable.balance - paymentData.amount)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">Estado después del pago:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Chip
                    label={
                      payable.balance - paymentData.amount === 0 ? 'COMPLETAMENTE PAGADO' :
                      paymentData.amount > 0 ? 'PARCIALMENTE PAGADO' : 'PENDIENTE'
                    }
                    color={
                      payable.balance - paymentData.amount === 0 ? 'success' :
                      paymentData.amount > 0 ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Alertas */}
          {paymentData.amount === payable.balance && (
            <Grid item xs={12}>
              <Alert severity="success" icon={<TrendingUp />}>
                ¡Excelente! Este pago completará el saldo pendiente de la factura.
              </Alert>
            </Grid>
          )}

          {new Date(payable.dueDate) < new Date() && (
            <Grid item xs={12}>
              <Alert severity="warning" icon={<Warning />}>
                Esta factura está vencida desde el {formatDate(payable.dueDate)}.
              </Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          startIcon={<Payment />}
          disabled={paymentData.amount <= 0}
        >
          Registrar Pago
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;