// frontend/admin-panel/src/hooks/useCacheQuery.js
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useCacheQuery = (endpoint, options = {}) => {
  const { cacheKey = endpoint, expirationMinutes = 5 } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        
        // Guardar en caché
        const cacheValue = {
          value: response,
          timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheValue));
        
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Intentar obtener de caché primero
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { value, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > expirationMinutes * 60000;
      
      if (!isExpired) {
        setData(value);
        setLoading(false);
        return;
      }
    }

    fetchData();
  }, [endpoint, cacheKey, expirationMinutes]);

  return { data, loading, error };
};