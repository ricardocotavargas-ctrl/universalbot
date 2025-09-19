import React, { useState } from 'react';
import { TextField, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchItems = [
    { type: 'Empresa', name: 'Tech Solutions SA', id: 1 },
    { type: 'Cliente', name: 'Maria García', id: 2 },
    { type: 'Servicio', name: 'Chatbot Premium', id: 3 }
  ];

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 2) {
      setResults(searchItems.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setResults([]);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 400 }}>
      <TextField
        fullWidth
        placeholder="Buscar empresas, clientes, servicios..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
        }}
      />
      
      {results.length > 0 && (
        <Paper sx={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          mt: 1 
        }}>
          <List>
            {results.map(result => (
              <ListItem key={result.id} button>
                <ListItemText 
                  primary={result.name} 
                  secondary={result.type} 
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};