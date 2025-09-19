import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { InfoOutlined } from '@mui/icons-material';

const MotionCard = motion(Card);

const StatsCard = ({ title, value, subtitle, progress, icon, color = 'primary', delay = 0, info }) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradientColors = {
    primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    secondary: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
  };

  const glowColors = {
    primary: 'rgba(99, 102, 241, 0.4)',
    success: 'rgba(16, 185, 129, 0.4)',
    warning: 'rgba(245, 158, 11, 0.4)',
    secondary: 'rgba(100, 116, 139, 0.4)',
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      sx={{ 
        height: '100%', 
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: isHovered 
          ? `0 25px 50px -12px ${glowColors[color]}`
          : '0 15px 35px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: gradientColors[color],
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
        {/* Header con tooltip de información */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#cbd5e1',
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </Typography>
          {info && (
            <Tooltip title={info} arrow>
              <InfoOutlined sx={{ fontSize: 18, color: '#94a3b8', cursor: 'help' }} />
            </Tooltip>
          )}
        </Box>

        {/* Valor principal */}
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 1,
              background: gradientColors[color],
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.2rem', sm: '2.5rem' }
            }}
          >
            {value}
          </Typography>
        </motion.div>

        {/* Subtítulo */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#94a3b8',
            fontSize: '0.95rem',
            fontWeight: 500,
            mb: 2
          }}
        >
          {subtitle}
        </Typography>

        {/* Icono */}
        <motion.div
          animate={{ 
            rotate: isHovered ? 5 : 0,
            scale: isHovered ? 1.15 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              background: gradientColors[color],
              borderRadius: '16px',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              boxShadow: `0 8px 25px ${glowColors[color]}`,
              border: '2px solid rgba(255, 255, 255, 0.2)',
              marginLeft: 'auto'
            }}
          >
            {React.cloneElement(icon, { 
              sx: { 
                fontSize: '28px', 
                color: '#ffffff',
              } 
            })}
          </Box>
        </motion.div>
        
        {/* Progress bar */}
        {progress !== undefined && (
          <Box sx={{ mt: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: gradientColors[color],
                  borderRadius: 4,
                  transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 0 15px ${glowColors[color]}`,
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
                Progreso mensual
              </Typography>
              <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 700 }}>
                {progress}%
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Efecto de brillo al hover */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isHovered ? `radial-gradient(circle at 50% 50%, ${glowColors[color]} 0%, transparent 70%)` : 'none',
        opacity: isHovered ? 0.2 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 1
      }} />
    </MotionCard>
  );
};

export default StatsCard;