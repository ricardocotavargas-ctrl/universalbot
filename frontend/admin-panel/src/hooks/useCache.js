// frontend/admin-panel/src/utils/api.js - ACTUALIZADO
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// Cache para requests frecuentes
const requestCache = new Map();

export const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    const tenantId = localStorage.getItem('tenantId');
    
    // Crear cache key para requests GET
    const isGetRequest = !options.method || options.method === 'GET';
    const cacheKey = isGetRequest ? `${endpoint}-${JSON.stringify(options)}` : null;

    // Verificar cache para GET requests
    if (isGetRequest && cacheKey && requestCache.has(cacheKey)) {
      const cached = requestCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 30000) { // 30 segundos cache
        return cached.data;
      }
    }

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // Prevenir CSRF
        'X-Client-Version': process.env.REACT_APP_VERSION || '1.0.0',
        ...options.headers,
      },
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      // Manejar respuestas no JSON
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();

      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('tenantId');
          window.location.href = '/login?session=expired';
        }
        
        throw new ApiError(
          data?.error || `Error ${response.status}`,
          response.status,
          data?.code
        );
      }

      // Cachear respuesta para GET requests
      if (isGetRequest && cacheKey) {
        requestCache.set(cacheKey, {
          data: data,
          timestamp: Date.now()
        });
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      
      // Manejo de errores de conexión
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new ApiError('Error de conexión. Verifica tu internet.', 0, 'NETWORK_ERROR');
      }
      
      throw new ApiError('Error inesperado', 0, 'UNKNOWN_ERROR');
    }
  },

  get(endpoint, options) { 
    return this.request(endpoint, { ...options, method: 'GET' }); 
  },
  post(endpoint, data, options) { 
    return this.request(endpoint, { ...options, method: 'POST', body: data }); 
  },
  put(endpoint, data, options) { 
    return this.request(endpoint, { ...options, method: 'PUT', body: data }); 
  },
  delete(endpoint, options) { 
    return this.request(endpoint, { ...options, method: 'DELETE' }); 
  },

  // Limpiar cache específico
  clearCache(endpointPattern) {
    if (!endpointPattern) {
      requestCache.clear();
      return;
    }

    for (const key of requestCache.keys()) {
      if (key.includes(endpointPattern)) {
        requestCache.delete(key);
      }
    }
  }
};

// Interceptor para agregar timestamp a todas las requests
const originalRequest = api.request;
api.request = function(endpoint, options = {}) {
  const timestamp = Date.now();
  const urlWithTimestamp = endpoint.includes('?') 
    ? `${endpoint}&_t=${timestamp}`
    : `${endpoint}?_t=${timestamp}`;
  
  return originalRequest.call(this, urlWithTimestamp, options);
};

export const setCurrentTenant = (tenantId) => {
  localStorage.setItem('tenantId', tenantId);
  api.clearCache(); // Limpiar cache al cambiar tenant
};

export const getCurrentTenant = () => {
  return localStorage.getItem('tenantId');
};

// Función para manejar errores de forma consistente
export const handleApiError = (error, setError) => {
  if (error.code === 'NETWORK_ERROR') {
    setError('Error de conexión. Verifica tu internet.');
  } else if (error.status === 401) {
    setError('Sesión expirada. Por favor inicia sesión nuevamente.');
  } else if (error.status === 403) {
    setError('No tienes permisos para realizar esta acción.');
  } else if (error.status === 404) {
    setError('Recurso no encontrado.');
  } else if (error.status >= 500) {
    setError('Error del servidor. Por favor intenta más tarde.');
  } else {
    setError(error.message || 'Error inesperado');
  }
};