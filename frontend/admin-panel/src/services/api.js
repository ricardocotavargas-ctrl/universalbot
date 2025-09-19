import axios from 'axios';

// ✅ URL DIRECTA SIN VARIABLES DE ENTORNO
const API_BASE_URL = 'https://universalbot-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
