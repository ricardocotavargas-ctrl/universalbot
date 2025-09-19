import React from 'react';
import {
  Paper, Typography, List, ListItem, ListItemAvatar,
  ListItemText, Avatar, Chip, Box, useTheme,
  IconButton, Tooltip, Collapse
} from '@mui/material';
import {
  Psychology, TrendingUp, PriorityHigh, 
  Lightbulb, ExpandMore, ExpandLess
} from '@mui/icons-material';

const AiSuggestions = ({ suggestions = [], maxItems = 3 }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const getPriorityIcon = (priority) => {
    const icons = {
      high: <PriorityHigh color="error" />,
      medium: <TrendingUp color="warning" />,
      low: <Lightbulb color="success" />
    };
    return icons[priority] || <Lightbulb />;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'success'
    };
    return colors[priority] || 'default';
  };

  const displayedSuggestions = expanded ? suggestions : suggestions.slice(0, maxItems);

  if (suggestions.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          🎯 Sugerencias de IA
        </Typography>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Psychology sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="textSecondary">
            No hay sugerencias en este momento
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Las sugerencias aparecerán basadas en tu actividad
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          🎯 Sugerencias de IA
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={`${suggestions.length} sugerencias`} 
            size="small" 
            variant="outlined"
          />
          {suggestions.length > maxItems && (
            <Tooltip title={expanded ? 'Mostrar menos' : 'Mostrar todas'}>
              <IconButton 
                size="small" 
                onClick={() => setExpanded(!expanded)}
                sx={{ 
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1
                }}
              >
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <List dense>
        <Collapse in={true} timeout="auto" unmountOnExit>
          {displayedSuggestions.map((suggestion, index) => (
            <ListItem 
              key={suggestion.id || index}
              sx={{ 
                alignItems: 'flex-start',
                mb: 1,
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette[getPriorityColor(suggestion.priority)]?.light || 'grey.300',
                    width: 32, 
                    height: 32 
                  }}
                >
                  {getPriorityIcon(suggestion.priority)}
                </Avatar>
              </ListItemAvatar>
              
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {suggestion.message}
                    </Typography>
                    <Chip 
                      label={suggestion.priority} 
                      size="small"
                      color={getPriorityColor(suggestion.priority)}
                      variant="filled"
                      sx={{ 
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Typography 
                    variant="caption" 
                    color="textSecondary"
                    sx={{ 
                      display: 'block',
                      fontStyle: 'italic'
                    }}
                  >
                    Basado en análisis de patrones de {suggestion.type}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </Collapse>
      </List>

      {suggestions.length > maxItems && (
        <Box sx={{ 
          textAlign: 'center', 
          mt: 1,
          pt: 1, 
          borderTop: `1px solid ${theme.palette.divider}` 
        }}>
          <Typography variant="caption" color="primary">
            {expanded ? `Mostrando todas las ${suggestions.length} sugerencias` : `+${suggestions.length - maxItems} más sugerencias`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default AiSuggestions;