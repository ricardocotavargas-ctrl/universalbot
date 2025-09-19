import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { SupportAgent } from '@mui/icons-material';

const SupportChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, left: 24 }}
        onClick={() => setOpen(true)}
      >
        <SupportAgent />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Soporte 24/7</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Describe tu problema..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" sx={{ mt: 2 }}>
            Enviar a soporte
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportChat;