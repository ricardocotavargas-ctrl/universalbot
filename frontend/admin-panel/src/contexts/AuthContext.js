// frontend/admin-panel/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ AÑADIDO

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = authService.getToken();
      if (token) {
        const authData = await authService.verifyToken();
        if (authData.valid) {
          setUser(authData.user);
          setIsAuthenticated(true); // ✅ AÑADIDO
        } else {
          authService.logout();
          setIsAuthenticated(false); // ✅ AÑADIDO
        }
      } else {
        setIsAuthenticated(false); // ✅ AÑADIDO
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      authService.logout();
      setIsAuthenticated(false); // ✅ AÑADIDO
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true); // ✅ AÑADIDO
      return { success: true };
    } catch (error) {
      setIsAuthenticated(false); // ✅ AÑADIDO
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      setIsAuthenticated(true); // ✅ AÑADIDO
      return { success: true };
    } catch (error) {
      setIsAuthenticated(false); // ✅ AÑADIDO
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false); // ✅ AÑADIDO
  };

  const value = {
    user,
    isAuthenticated, // ✅ AÑADIDO
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
