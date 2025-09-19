import api from './api';

export const authService = {
  // REGISTRO
  register: async (userData) => {
    try {
      console.log('📨 Enviando registro a:', `${api.defaults.baseURL}/auth/register`);
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Error en el registro. Intenta nuevamente.';
      throw new Error(errorMessage);
    }
  },

  // LOGIN
  login: async (email, password) => {
    try {
      console.log('🔐 Intentando login con:', email);
      console.log('📡 Endpoint:', `${api.defaults.baseURL}/auth/login`);
      
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
      } else if (error.message.includes('timeout')) {
        errorMessage = 'El servidor está tardando demasiado. Intenta nuevamente.';
      }
      
      throw new Error(errorMessage);
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('👋 Sesión cerrada');
  },

  // VERIFICAR TOKEN
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
