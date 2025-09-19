import axios from 'axios';

const getAPIBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }
  return process.env.REACT_APP_API_URL || 'https://universalbot-dsko.onrender.com/api';
};

const API_BASE_URL = getAPIBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado refrescar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar verificar el token actual primero
        const verifyResponse = await api.get('/auth/verify');
        
        if (verifyResponse.data.valid) {
          // El token es válido, reintentar la request original
          return api(originalRequest);
        }
      } catch (verifyError) {
        console.error('Token verification failed:', verifyError);
        
        // Redirigir al login si el token no es válido
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Event listener para cambios en localStorage
window.addEventListener('storage', (event) => {
  if (event.key === 'authToken' && !event.newValue) {
    // Token fue removido desde otra pestaña, redirigir
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
});

export default api;
