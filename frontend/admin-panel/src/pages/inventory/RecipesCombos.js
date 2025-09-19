import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import {
  Add, Edit, Delete, Restaurant, LocalBar, Fastfood
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const RecipesCombos = () => {
  const [recipes, setRecipes] = useState([]);
  const [combos, setCombos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('recipe');

  const mockRecipes = [
    { id: 1, name: 'Café Americano', type: 'bebida', cost: 1.50, price: 3.00, ingredients: ['Café', 'Agua'], preparationTime: 5 },
    { id: 2, name: 'Capuchino', type: 'bebida', cost: 2.00, price: 4.50, ingredients: ['Café', 'Leche', 'Chocolate'], preparationTime: 7 },
    { id: 3, name: 'Té Verde', type: 'bebida', cost: 1.00, price: 2.50, ingredients: ['Té verde', 'Agua', 'Miel'], preparationTime: 4 }
  ];

  const mockCombos = [
    { id: 1, name: 'Desayuno Completo', items: ['Café Americano', 'Croissant'], cost: 3.00, price: 7.50, discount: 15 },
    { id: 2, name: 'Combo Merienda', items: ['Capuchino', 'Pastel Chocolate'], cost: 4.50, price: 9.00, discount: 20 }
  ];

  useEffect(() => {
    setRecipes(mockRecipes);
    setCombos(mockCombos);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'bebida': return <LocalBar />;
      case 'comida': return <Fastfood />;
      default: return <Restaurant />;
    }
  };

  const getTypeColor = (type) => {
    return type === 'bebida' ? 'primary' : 'secondary';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Recetas y Combos
        </Typography>
        <Typography color="text.secondary">
          Gestión de recetas de productos y combos promocionales
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setDialogType('recipe');
              setOpenDialog(true);
            }}
          >
            Nueva Receta
          </Button>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => {
              setDialogType('combo');
              setOpenDialog(true);
            }}
          >
            Nuevo Combo
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3}>
        {/* Sección de Recetas */}
        <Grid item xs={12} md={6}>
          <UBCard>
            <Typography variant="h6" gutterBottom>
              Recetas de Productos
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Receta</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Costo</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="center">Tiempo</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell>
                        <Typography fontWeight="medium">{recipe.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getTypeIcon(recipe.type)}
                          label={recipe.type}
                          color={getTypeColor(recipe.type)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">{formatCurrency(recipe.cost)}</TableCell>
                      <TableCell align="right">{formatCurrency(recipe.price)}</TableCell>
                      <TableCell align="center">{recipe.preparationTime} min</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </UBCard>
        </Grid>

        {/* Sección de Combos */}
        <Grid item xs={12} md={6}>
          <UBCard>
            <Typography variant="h6" gutterBottom>
              Combos Promocionales
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Combo</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell align="right">Costo</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="center">Descuento</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {combos.map((combo) => (
                    <TableRow key={combo.id}>
                      <TableCell>
                        <Typography fontWeight="medium">{combo.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {combo.items.join(', ')}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{formatCurrency(combo.cost)}</TableCell>
                      <TableCell align="right">{formatCurrency(combo.price)}</TableCell>
                      <TableCell align="center">
                        <Chip label={`${combo.discount}%`} color="success" size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </UBCard>
        </Grid>
      </Grid>

      {/* Diálogo para nueva receta/combo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogType === 'recipe' ? 'Nueva Receta' : 'Nuevo Combo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nombre" />
            </Grid>
            
            {dialogType === 'recipe' && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo</InputLabel>
                    <Select label="Tipo">
                      <MenuItem value="bebida">Bebida</MenuItem>
                      <MenuItem value="comida">Comida</MenuItem>
                      <MenuItem value="postre">Postre</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tiempo de Preparación (min)"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ingredientes"
                    multiline
                    rows={3}
                    placeholder="Separar ingredientes con comas"
                  />
                </Grid>
              </>
            )}
            
            {dialogType === 'combo' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Items del Combo"
                  multiline
                  rows={3}
                  placeholder="Separar items con comas"
                />
              </Grid>
            )}
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Costo"
                type="number"
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Precio de Venta"
                type="number"
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            
            {dialogType === 'combo' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descuento (%)"
                  type="number"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecipesCombos;