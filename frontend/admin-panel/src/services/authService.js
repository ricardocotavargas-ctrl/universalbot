import api from './api';

export const authService = {
  // REGISTRO
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  },

  // LOGIN
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en el login');
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // VERIFICAR TOKEN
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      this.logout();
      return null;
    }
  },

  // OBTENER USUARIO ACTUAL
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // OBTENER TOKEN
  getToken: () => {
    return localStorage.getItem('authToken');
  }
};