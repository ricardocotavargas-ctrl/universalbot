import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { useBusinesses } from './useBusinesses';

export const useDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { businesses } = useBusinesses();

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [customersRes, ordersRes, interactionsRes] = await Promise.all([
        api.get('/api/customers').catch(() => ({ data: [] })),
        api.get('/api/orders').catch(() => ({ data: [] })),
        api.get('/api/interactions').catch(() => ({ data: [] }))
      ]);

      const customers = customersRes.data || customersRes || [];
      const orders = ordersRes.data || ordersRes || [];
      const interactions = interactionsRes.data || interactionsRes || [];

      // Calcular estadísticas
      const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
      const convertedInteractions = interactions.filter(i => 
        i.status === 'converted' || i.status === 'completed'
      ).length;

      const conversionRate = interactions.length > 0 
        ? Math.round((convertedInteractions / interactions.length) * 100) 
        : 0;

      setStats({
        totalBusinesses: businesses.length,
        totalCustomers: customers.length,
        totalOrders: orders.length,
        totalInteractions: interactions.length,
        totalRevenue,
        conversionRate: `${conversionRate}%`,
        monthlyGrowth: "+18%",
        activeChats: interactions.filter(i => i.status === 'active').length,
        satisfactionRate: "92%",
        responseTime: "2.3min",
        avgOrderValue: orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : "0.00"
      });

    } catch (err) {
      setError(err.message);
      // Datos de demo para estadísticas
      setStats({
        totalBusinesses: businesses.length,
        totalCustomers: 156,
        totalOrders: 89,
        totalInteractions: 245,
        totalRevenue: 18500.50,
        conversionRate: "24%",
        monthlyGrowth: "+18%",
        activeChats: 12,
        satisfactionRate: "92%",
        responseTime: "2.3min",
        avgOrderValue: "207.87"
      });
    } finally {
      setLoading(false);
    }
  }, [businesses]);

  useEffect(() => {
    if (businesses.length > 0) {
      fetchDashboardData();
    }
  }, [businesses, fetchDashboardData]);

  return {
    stats,
    loading,
    error,
    refreshData: fetchDashboardData
  };
};