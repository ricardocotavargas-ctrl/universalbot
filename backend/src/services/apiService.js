// src/services/apiService.js
const API_BASE_URL = 'http://localhost:3000/api';

// Función genérica para hacer peticiones
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Servicios específicos
export const businessService = {
  getAll: () => fetchAPI('/businesses'),
  getById: (id) => fetchAPI(`/businesses/${id}`),
  create: (data) => fetchAPI('/businesses', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/businesses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/businesses/${id}`, {
    method: 'DELETE',
  }),
};

export const userService = {
  getAll: () => fetchAPI('/users'),
  getById: (id) => fetchAPI(`/users/${id}`),
};

export const productService = {
  getAll: () => fetchAPI('/products'),
  getById: (id) => fetchAPI(`/products/${id}`),
};

export const orderService = {
  getAll: () => fetchAPI('/orders'),
  getById: (id) => fetchAPI(`/orders/${id}`),
  updateStatus: (id, status) => fetchAPI(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};

export const interactionService = {
  getAll: () => fetchAPI('/interactions'),
  create: (data) => fetchAPI('/interactions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default {
  businessService,
  userService,
  productService,
  orderService,
  interactionService,
};