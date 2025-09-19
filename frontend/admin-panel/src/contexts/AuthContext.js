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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    
    // Verificar autenticación periódicamente
    const interval = setInterval(() => {
      if (isAuthenticated) {
        checkAuth();
      }
    }, 300000); // 5 minutos
    
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      const authData = await authService.verifyToken();
      if (authData && authData.valid) {
        setUser(authData.user);
        setIsAuthenticated(true);
        
        // Actualizar localStorage con datos frescos
        localStorage.setItem('user', JSON.stringify(authData.user));
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await authService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      handleLogout();
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const data = await authService.register(userData);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      handleLogout();
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    handleLogout();
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
