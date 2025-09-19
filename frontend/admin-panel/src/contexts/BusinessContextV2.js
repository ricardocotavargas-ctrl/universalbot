// frontend/admin-panel/src/contexts/BusinessContextV2.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Ruta corregida: ./ (mismo directorio)
import { hasPermission, canViewBusiness } from '../utils/roles'; // Ruta corregida: ../utils/
import { api } from '../utils/api'; // Ruta corregida: ../utils/

const BusinessContextV2 = createContext();

export const useBusinessV2 = () => {
  const context = useContext(BusinessContextV2);
  if (!context) {
    throw new Error('useBusinessV2 must be used within a BusinessProviderV2');
  }
  return context;
};

export const BusinessProviderV2 = ({ children }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadBusinesses();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      let userBusinesses = [];
      
      // Simulación de datos para demo
      if (user?.email === 'demo@universalbot.com' || user?.role === 'demo') {
        userBusinesses = [
          {
            id: 1,
            name: 'Empresa Demo 1',
            ownerId: 999,
            rif: 'J-123456789',
            industry: 'tecnologia',
            status: 'active',
            plan: 'premium'
          },
          {
            id: 2,
            name: 'Empresa Demo 2', 
            ownerId: 999,
            rif: 'J-987654321',
            industry: 'comercio',
            status: 'active',
            plan: 'basic'
          }
        ];
      } else if (user?.role === 'superadmin') {
        // SuperAdmin ve TODAS las empresas (simulado)
        userBusinesses = [
          {
            id: 1,
            name: 'TechSolutions C.A.',
            ownerId: 2,
            rif: 'J-123456789',
            industry: 'tecnologia',
            status: 'active',
            plan: 'enterprise'
          },
          {
            id: 2,
            name: 'Consultores Asociados',
            ownerId: 3, 
            rif: 'J-987654321',
            industry: 'consultoria',
            status: 'active',
            plan: 'premium'
          }
        ];
      } else {
        // Cliente ve solo SUS empresas (simulado)
        userBusinesses = [
          {
            id: 1,
            name: 'Mi Empresa',
            ownerId: user?.id,
            rif: 'J-111111111',
            industry: 'comercio',
            status: 'active',
            plan: 'basic'
          }
        ];
      }

      setBusinesses(userBusinesses);
      
      if (userBusinesses.length > 0 && !selectedBusiness) {
        setSelectedBusiness(userBusinesses[0]);
      }
    } catch (error) {
      console.error('Error loading businesses:', error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const selectBusiness = (business) => {
    if (canViewBusiness(user, business.ownerId)) {
      setSelectedBusiness(business);
    }
  };

  const getFilteredBusinesses = () => {
    if (!user) return [];
    return businesses.filter(business => canViewBusiness(user, business.ownerId));
  };

  const value = {
    businesses: getFilteredBusinesses(),
    selectedBusiness,
    loading,
    selectBusiness,
    refreshBusinesses: loadBusinesses,
    canViewAll: hasPermission(user, 'view_all_businesses')
  };

  return (
    <BusinessContextV2.Provider value={value}>
      {children}
    </BusinessContextV2.Provider>
  );
};