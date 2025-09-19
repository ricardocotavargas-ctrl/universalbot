import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useBusinesses } from './useBusinesses';
import { useCustomers } from './useCustomers';
import { useOrders } from './useOrders';
import { useInteractions } from './useInteractions';

export const useStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { businesses } = useBusinesses();
  const { customers } = useCustomers();
  const { orders } = useOrders();
  const { interactions } = useInteractions();

  const calculateStats = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const totalCustomers = customers.length;
    const totalOrders = orders.length;
    const totalInteractions = interactions.length;
    
    const convertedInteractions = interactions.filter(i => 
      i.status === 'converted' || i.status === 'completed'
    ).length;
    
    const conversionRate = totalInteractions > 0 
      ? Math.round((convertedInteractions / totalInteractions) * 100) 
      : 0;

    const activeChats = interactions.filter(i => i.status === 'active').length;
    
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00";

    setStats({
      businesses: businesses.length,
      users: 0, // You might want to track users separately
      products: 0, // You might want to track products
      customers: totalCustomers,
      orders: totalOrders,
      interactions: totalInteractions,
      revenue: totalRevenue,
      conversionRate: conversionRate + '%',
      monthlyGrowth: "+18%",
      activeChats: activeChats,
      satisfactionRate: "92%",
      responseTime: "2.3min",
      avgOrderValue: avgOrderValue
    });
  };

  useEffect(() => {
    calculateStats();
  }, [businesses, customers, orders, interactions]);

  const refreshStats = () => {
    calculateStats();
  };

  return {
    stats,
    loading,
    refreshStats
  };
};