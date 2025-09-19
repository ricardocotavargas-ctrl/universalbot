import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import RequireAuth from './components/auth/RequireAuth';
import Layout from './components/layout/Layout';

// Páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import InventoryProducts from './pages/inventory/InventoryProducts';
import Sales from './pages/sales/Sales';
import Financial from './pages/financial/FinancialReports';

// Componente para rutas protegidas
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={
          <RequireAuth>
            <InventoryProducts />
          </RequireAuth>
        } />
        <Route path="/sales" element={
          <RequireAuth>
            <Sales />
          </RequireAuth>
        } />
        <Route path="/financial" element={
          <RequireAuth>
            <Financial />
          </RequireAuth>
        } />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
