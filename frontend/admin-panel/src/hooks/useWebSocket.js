import { useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url, events = {}) => {
  const socketRef = useRef(null);

  const connect = useCallback(() => {
    if (!socketRef.current) {
      socketRef.current = io(url, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
      });

      // Configurar eventos
      Object.entries(events).forEach(([event, handler]) => {
        socketRef.current.on(event, handler);
      });

      socketRef.current.on('connect', () => {
        console.log('✅ Conectado al servidor WebSocket');
      });

      socketRef.current.on('disconnect', () => {
        console.log('❌ Desconectado del servidor WebSocket');
      });
    }
  }, [url, events]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      console.log('🔌 Conexión WebSocket cerrada');
    }
  }, []);

  const emit = useCallback((event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { emit, disconnect, connect };
};

export default useWebSocket;