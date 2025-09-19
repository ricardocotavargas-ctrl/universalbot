import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
  const { checkAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    // Verificar autenticación cada minuto
    const interval = setInterval(() => {
      if (isAuthenticated) {
        checkAuth();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, checkAuth]);

  return (
    <div className="layout">
      {/* Tu layout existente */}
      {children}
    </div>
  );
};

export default Layout;
