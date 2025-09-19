import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useInteractions = () => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInteractions = async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/interactions');
      setInteractions(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      // Demo data
      const demoData = [
        { 
          id: 1, 
          customer: "Ana Rodriguez", 
          message: "¿Tienen iPhone 13 Pro disponible?", 
          response: "¡Sí! Tenemos 15 unidades a $899.99", 
          platform: "whatsapp", 
          timestamp: new Date(), 
          business: "Mi Tienda Online",
          status: "converted",
          revenue: 899.99,
          duration: "5:23"
        }
      ];
      setInteractions(demoData);
      return demoData;
    } finally {
      setLoading(false);
    }
  };

  const addInteraction = async (interactionData) => {
    try {
      const newInteraction = await api.post('/api/interactions', interactionData);
      setInteractions(prev => [newInteraction, ...prev]);
      return newInteraction;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchInteractions();
  }, []);

  return {
    interactions,
    loading,
    error,
    fetchInteractions,
    addInteraction
  };
};