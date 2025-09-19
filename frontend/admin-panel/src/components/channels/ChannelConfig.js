import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email
} from '@mui/icons-material';
import UBCard from '../ui/UBCard';

const ChannelConfig = ({ channel, onSave }) => {
  const [config, setConfig] = React.useState({
    apiKey: '',
    secret: '',
    webhook: '',
    enabled: true
  });

  const getChannelIcon = () => {
    switch (channel) {
      case 'whatsapp': return <WhatsApp sx={{ color: '#25D366' }} />;
      case 'facebook': return <Facebook sx={{ color: '#1877F2' }} />;
      case 'instagram': return <Instagram sx={{ color: '#E4405F' }} />;
      case 'email': return <Email sx={{ color: '#EA4335' }} />;
      default: return null;
    }
  };

  const getChannelName = () => {
    switch (channel) {
      case 'whatsapp': return 'WhatsApp Business';
      case 'facebook': return 'Facebook Messenger';
      case 'instagram': return 'Instagram Direct';
      case 'email': return 'Email Marketing';
      default: return '';
    }
  };

  return (
    <UBCard>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ fontSize: 32 }}>
          {getChannelIcon()}
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {getChannelName()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configuración de conexión
          </Typography>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Conecta tu cuenta de {getChannelName()} para automatizar respuestas y gestionar mensajes.
      </Alert>

      <TextField
        fullWidth
        label="API Key"
        value={config.apiKey}
        onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Secret Key"
        type="password"
        value={config.secret}
        onChange={(e) => setConfig({ ...config, secret: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Webhook URL"
        value={config.webhook}
        onChange={(e) => setConfig({ ...config, webhook: e.target.value })}
        sx={{ mb: 3 }}
        helperText="URL para recibir notificaciones de mensajes"
      />

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={() => onSave(config)}
        sx={{ py: 1.5 }}
      >
        Conectar {getChannelName()}
      </Button>
    </UBCard>
  );
};

export default ChannelConfig;