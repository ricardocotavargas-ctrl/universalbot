import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Tabs, Tab
} from '@mui/material';
import {
  Facebook, People, Message, TrendingUp, Settings, Campaign,
  ThumbUp, Share, Comment
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const FacebookIntegration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [connected, setConnected] = useState(true);
  const [stats, setStats] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const mockStats = {
    pageLikes: 1250,
    pageFollowers: 1450,
    engagementRate: 12.5,
    reach: 12500,
    posts: 45,
    messages: 320
  };

  const mockPosts = [
    { id: 1, content: '¡Nuevo producto disponible!', likes: 125, shares: 25, comments: 15, date: '2024-05-20' },
    { id: 2, content: 'Oferta especial de la semana', likes: 89, shares: 18, comments: 8, date: '2024-05-19' },
    { id: 3, content: 'Conoce nuestro equipo', likes: 156, shares: 32, comments: 12, date: '2024-05-18' }
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
          Integración con Facebook
        </Typography>
        <Typography color="text.secondary">
          Conecta y gestiona tu presencia en Facebook
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Facebook sx={{ fontSize: 40, color: '#1877F2', mr: 2 }} />
            <Box>
              <Typography variant="h6">Página de Facebook</Typography>
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
          >
            {connected ? 'Desconectar' : 'Conectar Facebook'}
          </Button>
        </Box>
      </UBCard>

      {connected && (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <ThumbUp color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{formatNumber(stats.pageLikes)}</Typography>
                  <Typography variant="body2" color="text.secondary">Me gusta</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <People color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{formatNumber(stats.pageFollowers)}</Typography>
                  <Typography variant="body2" color="text.secondary">Seguidores</Typography>
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
                  <Share color="info" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{formatNumber(stats.reach)}</Typography>
                  <Typography variant="body2" color="text.secondary">Alcance</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Campaign color="warning" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{stats.posts}</Typography>
                  <Typography variant="body2" color="text.secondary">Publicaciones</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Message color="error" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{stats.messages}</Typography>
                  <Typography variant="body2" color="text.secondary">Mensajes</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <UBCard>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab icon={<Campaign />} label="Publicaciones" />
                <Tab icon={<Message />} label="Mensajes" />
                <Tab icon={<People />} label="Audiencia" />
                <Tab icon={<Settings />} label="Configuración" />
              </Tabs>
            </Box>

            {activeTab === 0 && (
              <Grid container spacing={3}>
                {mockPosts.map((post) => (
                  <Grid item xs={12} md={6} key={post.id}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        {post.content}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Publicado el {new Date(post.date).toLocaleDateString('es-VE')}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ThumbUp sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{post.likes}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Share sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{post.shares}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Comment sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{post.comments}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}

            {activeTab === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Configuración de Facebook
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Sincronización automática de publicaciones"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Respuestas automáticas a mensajes"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Publicar en Instagram simultáneamente"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Notificaciones de comentarios"
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
        <DialogTitle>Configuración Avanzada de Facebook</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="App ID de Facebook" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="App Secret" type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Access Token" type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Webhook URL" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Modo desarrollador"
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

export default FacebookIntegration;