// frontend/admin-panel/src/services/authService.js
import api from './api';

export const authService = {
  register: async (userData) => {
    try {
      console.log('📨 Enviando registro a:', `${api.defaults.baseURL}/auth/register`);
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.dispatchEvent(new Event('authChange'));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  },

  login: async (email, password) => {
    try {
      console.log('🔐 Intentando login con:', email);
      console.log('📡 Endpoint:', `${api.defaults.baseURL}/auth/login`);
      
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.dispatchEvent(new Event('authChange'));
        console.log('✅ Login exitoso, token guardado');
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Error completo en login:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Error en el login';
      if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Credenciales incorrectas';
      } else if (error.response?.status === 500) {
        errorMessage = 'Error del servidor. Intenta más tarde.';
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Error de conexión. Verifica tu internet.';
      }
      
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    console.log('👋 Sesión cerrada');
  },

  verifyToken: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('⚠️ No hay token almacenado');
        return null;
      }

      const response = await api.get('/auth/verify');
      console.log('✅ Token verificado correctamente');
      return response.data;
    } catch (error) {
      console.error('❌ Error verificando token:', error.response?.data || error.message);
      this.logout();
      return null;
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  }
};
