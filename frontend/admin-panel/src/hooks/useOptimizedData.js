import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

export const useOptimizedData = (endpoint, defaultData = []) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(endpoint);
      setData(response.data || response);
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${endpoint}:`, err);
      // Si hay datos por defecto, los usamos
      if (defaultData.length > 0) {
        setData(defaultData);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, defaultData]);

  const createItem = useCallback(async (itemData) => {
    try {
      const newItem = await api.post(endpoint, itemData);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (error) {
      throw error;
    }
  }, [endpoint]);

  const updateItem = useCallback(async (id, itemData) => {
    try {
      const updatedItem = await api.put(`${endpoint}/${id}`, itemData);
      setData(prev => prev.map(item => item.id === id ? updatedItem : item));
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }, [endpoint]);

  const deleteItem = useCallback(async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      throw error;
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    setData
  };
};