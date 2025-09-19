// frontend/admin-panel/src/components/sales/SaleRegister.js
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, TextField, Button, FormControl, InputLabel,
  Select, MenuItem, IconButton, Box, Typography,
  Stepper, Step, StepLabel, Paper, Chip
} from '@mui/material';
import {
  Add, Remove, Close, QrCodeScanner,
  Receipt, Payment, Person, Inventory
} from '@mui/icons-material';
import { useBusiness } from '../../contexts/BusinessContext';

const SaleRegister = ({ open, onClose, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [saleData, setSaleData] = useState({
    client: { id: '', name: '', phone: '' },
    products: [{ id: '', name: '', quantity: 1, price: 0, sku: '' }],
    additionalCharges: [],
    paymentMethod: 'efectivo',
    saleChannel: 'tienda',
    tableNumber: '',
    notes: ''
  });

  const { selectedBusiness } = useBusiness();

  const steps = ['Cliente', 'Productos', 'Cargos', 'Resumen'];

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const addProduct = () => {
    setSaleData(prev => ({
      ...prev,
      products: [...prev.products, { id: '', name: '', quantity: 1, price: 0, sku: '' }]
    }));
  };

  const removeProduct = (index) => {
    setSaleData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const updateProduct = (index, field, value) => {
    setSaleData(prev => ({
      ...prev,
      products: prev.products.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  const addCharge = () => {
    setSaleData(prev => ({
      ...prev,
      additionalCharges: [...prev.additionalCharges, { type: '', amount: 0, description: '' }]
    }));
  };

  const calculateTotal = () => {
    const productsTotal = saleData.products.reduce((sum, product) => 
      sum + (product.quantity * product.price), 0);
    
    const chargesTotal = saleData.additionalCharges.reduce((sum, charge) => 
      sum + charge.amount, 0);
    
    return productsTotal + chargesTotal;
  };

  const calculateProfit = () => {
    // Simulación de cálculo de utilidad
    const costTotal = saleData.products.reduce((sum, product) => 
      sum + (product.quantity * product.price * 0.6), 0); // 60% costo
    return calculateTotal() - costTotal;
  };

  const handleQRScan = () => {
    // Simulación de escaneo QR
    const mockProduct = {
      id: Date.now(),
      name: 'Producto Escaneado',
      sku: 'QR12345',
      quantity: 1,
      price: 100
    };
    
    setSaleData(prev => ({
      ...prev,
      products: [...prev.products, mockProduct]
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Información del Cliente
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del Cliente"
                value={saleData.client.name}
                onChange={(e) => setSaleData({
                  ...saleData,
                  client: { ...saleData.client, name: e.target.value }
                })}
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                value={saleData.client.phone}
                onChange={(e) => setSaleData({
                  ...saleData,
                  client: { ...saleData.client, phone: e.target.value }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Canal de Venta</InputLabel>
                <Select
                  value={saleData.saleChannel}
                  label="Canal de Venta"
                  onChange={(e) => setSaleData({ ...saleData, saleChannel: e.target.value })}
                >
                  <MenuItem value="tienda">Tienda Física</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                  <MenuItem value="web">Página Web</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {saleData.saleChannel === 'tienda' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número de Mesa"
                  value={saleData.tableNumber}
                  onChange={(e) => setSaleData({ ...saleData, tableNumber: e.target.value })}
                  placeholder="Solo para restaurantes"
                />
              </Grid>
            )}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Productos</Typography>
                <Button
                  startIcon={<QrCodeScanner />}
                  onClick={handleQRScan}
                  variant="outlined"
                >
                  Escanear QR
                </Button>
              </Box>
            </Grid>
            
            {saleData.products.map((product, index) => (
              <Grid item xs={12} key={index}>
                <Paper sx={{ p: 2, border: '1px solid', borderColor: 'grey.200' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Producto"
                        value={product.name}
                        onChange={(e) => updateProduct(index, 'name', e.target.value)}
                        InputProps={{
                          startAdornment: <Inventory sx={{ mr: 1, color: 'action.active' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Cantidad"
                        value={product.quantity}
                        onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Precio"
                        value={product.price}
                        onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        fullWidth
                        label="SKU"
                        value={product.sku}
                        onChange={(e) => updateProduct(index, 'sku', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <Typography variant="body2">
                        Total: ${(product.quantity * product.price).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <IconButton onClick={() => removeProduct(index)}>
                        <Remove />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <Button startIcon={<Add />} onClick={addProduct} variant="outlined">
                Agregar Producto
              </Button>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Cargos Adicionales</Typography>
            </Grid>
            
            {saleData.additionalCharges.map((charge, index) => (
              <Grid item xs={12} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Tipo de cargo"
                        value={charge.type}
                        onChange={(e) => {
                          const newCharges = [...saleData.additionalCharges];
                          newCharges[index].type = e.target.value;
                          setSaleData({ ...saleData, additionalCharges: newCharges });
                        }}
                        select
                      >
                        <MenuItem value="delivery">Delivery</MenuItem>
                        <MenuItem value="empaque">Empaque</MenuItem>
                        <MenuItem value="comision">Comisión</MenuItem>
                        <MenuItem value="propina">Propina</MenuItem>
                        <MenuItem value="impuesto">Impuesto</MenuItem>
                        <MenuItem value="otro">Otro</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Monto"
                        value={charge.amount}
                        onChange={(e) => {
                          const newCharges = [...saleData.additionalCharges];
                          newCharges[index].amount = parseFloat(e.target.value);
                          setSaleData({ ...saleData, additionalCharges: newCharges });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Descripción"
                        value={charge.description}
                        onChange={(e) => {
                          const newCharges = [...saleData.additionalCharges];
                          newCharges[index].description = e.target.value;
                          setSaleData({ ...saleData, additionalCharges: newCharges });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <IconButton onClick={() => {
                        const newCharges = saleData.additionalCharges.filter((_, i) => i !== index);
                        setSaleData({ ...saleData, additionalCharges: newCharges });
                      }}>
                        <Remove />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <Button startIcon={<Add />} onClick={addCharge} variant="outlined">
                Agregar Cargo
              </Button>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Método de Pago</InputLabel>
                <Select
                  value={saleData.paymentMethod}
                  label="Método de Pago"
                  onChange={(e) => setSaleData({ ...saleData, paymentMethod: e.target.value })}
                >
                  <MenuItem value="efectivo">Efectivo</MenuItem>
                  <MenuItem value="transferencia">Transferencia</MenuItem>
                  <MenuItem value="tarjeta">Tarjeta de Crédito/Débito</MenuItem>
                  <MenuItem value="pago_movil">Pago Móvil</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notas adicionales"
                value={saleData.notes}
                onChange={(e) => setSaleData({ ...saleData, notes: e.target.value })}
                placeholder="Observaciones o detalles importantes de la venta..."
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Resumen de la Venta
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Detalles del Cliente
                </Typography>
                <Typography variant="body2">{saleData.client.name}</Typography>
                <Typography variant="body2">{saleData.client.phone}</Typography>
                <Chip 
                  label={saleData.saleChannel} 
                  sx={{ mt: 1 }} 
                  color="primary" 
                />
                {saleData.tableNumber && (
                  <Chip 
                    label={`Mesa ${saleData.tableNumber}`} 
                    sx={{ mt: 1, ml: 1 }} 
                    color="secondary" 
                  />
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Resumen de Pago
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    Productos: ${saleData.products.reduce((sum, p) => sum + (p.quantity * p.price), 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Cargos: ${saleData.additionalCharges.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Total: ${calculateTotal().toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Utilidad estimada: ${calculateProfit().toLocaleString()}
                  </Typography>
                </Box>
                <Chip 
                  label={saleData.paymentMethod} 
                  color="primary" 
                  variant="outlined" 
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Productos ({saleData.products.length})
                </Typography>
                {saleData.products.map((product, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {product.name} x{product.quantity}
                    </Typography>
                    <Typography variant="body2">
                      ${(product.quantity * product.price).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
            
            {saleData.additionalCharges.length > 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Cargos Adicionales
                  </Typography>
                  {saleData.additionalCharges.map((charge, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {charge.type} - {charge.description}
                      </Typography>
                      <Typography variant="body2">
                        ${charge.amount.toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            )}
          </Grid>
        );

      default:
        return <Typography>Paso no válido</Typography>;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            <Receipt sx={{ mr: 1, verticalAlign: 'middle' }} />
            Nueva Venta - {selectedBusiness?.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 3 }}>
          {renderStepContent(activeStep)}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={activeStep === 0 ? onClose : handleBack}>
          {activeStep === 0 ? 'Cancelar' : 'Atrás'}
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button 
            variant="contained" 
            onClick={() => onSave(saleData)}
            startIcon={<Payment />}
            disabled={!saleData.client.name || saleData.products.length === 0}
          >
            Finalizar Venta
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Siguiente
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SaleRegister;