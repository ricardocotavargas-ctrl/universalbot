import api from './api';

export const authService = {
  // LOGIN CON MEJOR MANEJO DE ERRORES
  login: async (email, password) => {
    try {
      console.log('🔐 Intentando login con:', email);
      console.log('📡 Endpoint:', `${api.defaults.baseURL}/auth/login`);
      
      const response = await api.post('/auth/login', {
        email,
        password
      });

      console.log('✅ Login exitoso:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('🔑 Token almacenado en localStorage');
      }

      return response.data;
    } catch (error) {
      console.error('❌ Error completo en login:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });
      
      let errorMessage = 'Error en el login';
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data.error || 'Credenciales incorrectas';
      } else if (error.response?.status === 401) {
        errorMessage = 'No autorizado';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Error de conexión. Verifica tu internet.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'El servidor está tardando demasiado. Intenta nuevamente.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Error del servidor. Intenta más tarde.';
      }
      
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
