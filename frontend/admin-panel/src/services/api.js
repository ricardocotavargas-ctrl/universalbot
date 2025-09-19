import axios from 'axios';

// ✅ USAR LA URL CORRECTA QUE RENDER TE PROPORCIONA
const API_BASE_URL = 'https://universalbot-dsko.onrender.com';

console.log('🔗 Conectando a API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
