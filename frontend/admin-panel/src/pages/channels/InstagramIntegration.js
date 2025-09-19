import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Tabs, Tab, Avatar
} from '@mui/material';
import {
  Instagram, Favorite, People, Message, TrendingUp, Settings,
  Comment, Share, Bookmark
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const InstagramIntegration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [connected, setConnected] = useState(true);
  const [stats, setStats] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const mockStats = {
    followers: 3450,
    following: 250,
    posts: 78,
    engagementRate: 8.2,
    reach: 18700,
    impressions: 24500
  };

  const mockPosts = [
    { id: 1, image: '📸', likes: 456, comments: 32, date: '2024-05-20', caption: 'Nuevos productos en stock! #nuevo' },
    { id: 2, image: '📸', likes: 321, comments: 28, date: '2024-05-19', caption: 'Behind the scenes 🎬' },
    { id: 3, image: '📸', likes: 589, comments: 45, date: '2024-05-18', caption: 'Clientes felices 😊 #testimonio' }
  ];

  useEffect(() => {
    setStats(mockStats);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-VE').format(num);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Integración con Instagram
        </Typography>
        <Typography color="text.secondary">
          Conecta y gestiona tu perfil de Instagram
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Instagram sx={{ fontSize: 40, color: '#E1306C', mr: 2 }} />
            <Box>
              <Typography variant="h6">@tuempresa</Typography>
              <Chip
                label={connected ? 'Conectado' : 'Desconectado'}
                color={connected ? 'success' : 'error'}
                size="small"
              />
            </Box>
          </Box>
          <Button
            variant={connected ? "outlined" : "contained"}
            color={connected ? "error" : "primary"}
            onClick={() => setConnected(!connected)}
            startIcon={<Instagram />}
          >
            {connected ? 'Desconectar' : 'Conectar Instagram'}
          </Button>
        </Box>
      </UBCard>

      {connected && (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{formatNumber(stats.followers)}</Typography>
                  <Typography variant="body2" color="text.secondary">Seguidores</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <People color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{formatNumber(stats.following)}</Typography>
                  <Typography variant="body2" color="text.secondary">Siguiendo</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Bookmark color="info" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{stats.posts}</Typography>
                  <Typography variant="body2" color="text.secondary">Publicaciones</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <TrendingUp color="success" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{stats.engagementRate}%</Typography>
                  <Typography variant="body2" color="text.secondary">Engagement</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Share color="warning" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{formatNumber(stats.reach)}</Typography>
                  <Typography variant="body2" color="text.secondary">Alcance</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Favorite color="error" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{formatNumber(stats.impressions)}</Typography>
                  <Typography variant="body2" color="text.secondary">Impresiones</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <UBCard>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab icon={<Bookmark />} label="Publicaciones" />
                <Tab icon={<Message />} label="Mensajes Directos" />
                <Tab icon={<People />} label="Seguidores" />
                <Tab icon={<Settings />} label="Configuración" />
              </Tabs>
            </Box>

            {activeTab === 0 && (
              <Grid container spacing={3}>
                {mockPosts.map((post) => (
                  <Grid item xs={12} md={4} key={post.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ textAlign: 'center', mb: 2, fontSize: 48 }}>
                          {post.image}
                        </Box>
                        <Typography variant="body2" gutterBottom>
                          {post.caption}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                          {new Date(post.date).toLocaleDateString('es-VE')}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Favorite sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2">{formatNumber(post.likes)}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Comment sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2">{post.comments}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {activeTab === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Configuración de Instagram
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Sincronizar con Facebook"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Publicar en múltiples cuentas"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Modo profesional"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Notificaciones de mensajes"
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 3 }} onClick={() => setOpenDialog(true)}>
                  Configuración Avanzada
                </Button>
              </Box>
            )}
          </UBCard>
        </>
      )}

      {/* Diálogo de configuración avanzada */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Configuración Avanzada de Instagram</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Instagram Business ID" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Access Token" type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="User ID" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Cuenta</InputLabel>
                <Select label="Tipo de Cuenta">
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="creator">Creator</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch />}
                label="Habilitar insights avanzados"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Guardar Configuración
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InstagramIntegration;