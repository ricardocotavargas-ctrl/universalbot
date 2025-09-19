import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/orders');
      setOrders(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      // Demo data
      const demoData = [
        { id: 1, order_number: "ORD-001", customer: "Ana Rodriguez", amount: 899.99, status: "completed", date: new Date(), items: ["iPhone 13 Pro"] },
        { id: 2, order_number: "ORD-002", customer: "Carlos Mendoza", amount: 50.00, status: "completed", date: new Date(), items: ["Consulta Médica General"] }
      ];
      setOrders(demoData);
      return demoData;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const updatedOrder = await api.put(`/api/orders/${orderId}`, { status });
      setOrders(prev => prev.map(order => order.id === orderId ? updatedOrder : order));
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus
  };
};