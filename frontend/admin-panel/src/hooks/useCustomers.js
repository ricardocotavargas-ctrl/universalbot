import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/customers');
      setCustomers(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      // Demo data
      const demoData = [
        { id: 1, name: "Ana Rodriguez", phone: "+1234567890", last_interaction: new Date(), status: "active", business_id: 1, email: "ana@email.com" },
        { id: 2, name: "Carlos Mendoza", phone: "+0987654321", last_interaction: new Date(), status: "active", business_id: 2, email: "carlos@email.com" }
      ];
      setCustomers(demoData);
      return demoData;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    fetchCustomers
  };
};