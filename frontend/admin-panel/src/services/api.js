import axios from 'axios';

// ✅ URL DE RAILWAY - REEMPLAZA CON LA TUYA
const API_BASE_URL = 'https://universalbot-production.up.railway.app';

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
