// frontend/admin-panel/src/contexts/BusinessContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../utils/api';
import { hasPermission } from '../utils/roles'; // Importar la función de permisos

const BusinessContext = createContext();

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // CARGAR EMPRESAS SEGÚN EL ROL
  useEffect(() => {
    if (user) {
      loadBusinesses();
    }
  }, [user]);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      let userBusinesses = [];
      
      if (user.role === 'superadmin') {
        // SuperAdmin ve TODAS las empresas de TODOS los clientes
        userBusinesses = await api.get('/api/businesses');
      } else {
        // Cliente ve solo SUS propias empresas
        userBusinesses = await api.get(`/api/users/${user.id}/businesses`);
      }

      setBusinesses(userBusinesses);
      
      // Auto-seleccionar primera empresa solo si no hay una seleccionada
      if (userBusinesses.length > 0 && !selectedBusiness) {
        setSelectedBusiness(userBusinesses[0]);
      }
    } catch (error) {
      console.error('Error loading businesses:', error);
      // Datos de demostración en caso de error
      const demoBusinesses = getDemoBusinesses(user);
      setBusinesses(demoBusinesses);
      
      if (demoBusinesses.length > 0 && !selectedBusiness) {
        setSelectedBusiness(demoBusinesses[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getDemoBusinesses = (user) => {
    if (user?.role === 'superadmin') {
      return [
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
    } else if (user?.role === 'demo') {
      return [
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
    } else {
      return [
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
  };

  const selectBusiness = (business) => {
    setSelectedBusiness(business);
  };

  const updateBusiness = (updatedBusiness) => {
    setBusinesses(prev => prev.map(b => 
      b.id === updatedBusiness.id ? updatedBusiness : b
    ));
    if (selectedBusiness?.id === updatedBusiness.id) {
      setSelectedBusiness(updatedBusiness);
    }
  };

  const addBusiness = (newBusiness) => {
    setBusinesses(prev => [...prev, newBusiness]);
  };

  const removeBusiness = (businessId) => {
    setBusinesses(prev => prev.filter(b => b.id !== businessId));
    if (selectedBusiness?.id === businessId) {
      setSelectedBusiness(businesses[0] || null);
    }
  };

  // CORRECCIÓN: Esta línea probablemente causaba el error
  const canViewAll = user ? hasPermission(user, 'view_all_businesses') : false;

  const value = {
    businesses,
    selectedBusiness,
    loading,
    selectBusiness,
    refreshBusinesses: loadBusinesses,
    updateBusiness,
    addBusiness,
    removeBusiness,
    canViewAll // Usar la variable definida
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};