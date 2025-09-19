// frontend/admin-panel/src/contexts/WebSocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const wsScheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${wsScheme}//${window.location.host}/ws/notifications/`;
      
      const newSocket = new WebSocket(wsUrl);

      newSocket.onopen = () => {
        console.log('WebSocket conectado');
        setIsConnected(true);
        
        // Enviar autenticación después de conectar
        const authMessage = {
          type: 'authentication',
          token: localStorage.getItem('accessToken'),
          userId: user.id
        };
        newSocket.send(JSON.stringify(authMessage));
      };

      newSocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          handleWebSocketMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      newSocket.onclose = () => {
        console.log('WebSocket desconectado');
        setIsConnected(false);
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, user]);

  const handleWebSocketMessage = (message) => {
    switch (message.type) {
      case 'notification':
        handleNewNotification(message.data);
        break;
      case 'message':
        handleNewMessage(message.data);
        break;
      case 'status_update':
        handleStatusUpdate(message.data);
        break;
      case 'auth_success':
        console.log('Autenticación WebSocket exitosa');
        break;
      case 'auth_failed':
        console.error('Autenticación WebSocket fallida');
        break;
      default:
        console.log('Mensaje WebSocket no manejado:', message);
    }
  };

  const handleNewNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 49)]);
    
    // Mostrar notificación toast si la página está visible
    if (document.visibilityState === 'visible') {
      showToastNotification(notification);
    }
  };

  const handleNewMessage = (message) => {
    // Actualizar estado de mensajes en tiempo real
    // Esto se integraría con tu contexto de mensajes
    console.log('Nuevo mensaje recibido:', message);
  };

  const handleStatusUpdate = (update) => {
    // Actualizar estados en tiempo real (ej: estado de canales, usuarios, etc.)
    console.log('Actualización de estado:', update);
  };

  const showToastNotification = (notification) => {
    // Crear toast notification
    const event = new CustomEvent('showNotification', {
      detail: {
        title: notification.title,
        message: notification.message,
        type: notification.level || 'info'
      }
    });
    window.dispatchEvent(event);
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const value = {
    socket,
    isConnected,
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    sendMessage,
    clearNotifications,
    markAsRead
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};