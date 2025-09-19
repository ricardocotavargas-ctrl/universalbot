// frontend/admin-panel/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://universalbot-dsko.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para responses - MENOS AGRESIVO
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Verificar si el token es válido
        const verifyResponse = await api.get('/auth/verify');
        
        if (verifyResponse.data.valid) {
          return api(originalRequest);
        }
      } catch (verifyError) {
        console.error('Token verification failed:', verifyError);
        
        // Solo redirigir si no estamos en login
        if (window.location.pathname !== '/login') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('authChange'));
        }
      }
    }

    return Promise.reject(error);
  }
);

// Event listener para cambios de autenticación
window.addEventListener('authChange', () => {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
});

export default api;
