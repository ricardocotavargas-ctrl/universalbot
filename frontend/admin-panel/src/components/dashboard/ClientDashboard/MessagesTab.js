import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ChatBubble } from '@mui/icons-material';

const MessagesTab = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      💬 Gestión de Mensajes
    </Typography>
    <Paper sx={{ p: 3 }}>
      <Typography>Panel de mensajes integrado con WhatsApp, Facebook e Instagram</Typography>
    </Paper>
  </Box>
);

export default MessagesTab;