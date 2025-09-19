// frontend/admin-panel/src/App.js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LinearProgress, Box, Typography } from '@mui/material';

// Contextos
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BusinessProvider } from './contexts/BusinessContext';
import { BusinessProviderV2 } from './contexts/BusinessContextV2';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

// Componentes
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';
import RoleRoute from './components/auth/RoleRoute';

// Componentes de carga
const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom align="center">
        Cargando...
      </Typography>
      <LinearProgress />
    </Box>
  </Box>
);

// Lazy loading para mejores performance
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Páginas Principales
const Companies = lazy(() => import('./pages/admin/Companies'));
const CompanyDetail = lazy(() => import('./pages/CompanyDetail'));
const Clients = lazy(() => import('./pages/marketing/Clients'));
const Services = lazy(() => import('./pages/Services'));
const Interactions = lazy(() => import('./pages/Interactions'));
const AIFlows = lazy(() => import('./pages/AIFlows'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const AdminDashboard = lazy(() => import('./pages/admin/components/AdminDashboard'));
const Users = lazy(() => import('./pages/admin/Users'));
const PlanManagement = lazy(() => import('./pages/PlanManagement'));

// Páginas de Ventas
const Sales = lazy(() => import('./pages/sales/Sales'));
const NewSale = lazy(() => import('./pages/sales/NewSale'));
const TablesManagement = lazy(() => import('./pages/sales/TablesManagement'));
const SalesChannels = lazy(() => import('./pages/sales/SalesChannels'));
const SalesBySeller = lazy(() => import('./pages/sales/SalesBySeller'));
const SalesByProduct = lazy(() => import('./pages/sales/SalesByProduct'));

// Páginas de Inventario
const InventoryProducts = lazy(() => import('./pages/inventory/InventoryProducts'));
const RecipesCombos = lazy(() => import('./pages/inventory/RecipesCombos'));
const InventoryMovements = lazy(() => import('./pages/inventory/InventoryMovements'));
const Adjustments = lazy(() => import('./pages/inventory/Adjustments'));
const Transfers = lazy(() => import('./pages/inventory/Transfers'));
const StockAlerts = lazy(() => import('./pages/inventory/StockAlerts'));

// Páginas de Cuentas
const Banks = lazy(() => import('./pages/accounts/Banks'));
const Reconciliation = lazy(() => import('./pages/accounts/Reconciliation'));
const Payables = lazy(() => import('./pages/accounts/Payables'));
const Receivables = lazy(() => import('./pages/accounts/Receivables'));
const AccountsHistory = lazy(() => import('./pages/accounts/AccountsHistory'));

// Páginas Financieras
const FixedVariableCosts = lazy(() => import('./pages/financial/FixedVariableCosts'));
const FixedVariableExpenses = lazy(() => import('./pages/financial/FixedVariableExpenses'));
const FinancialReports = lazy(() => import('./pages/financial/FinancialReports'));
const ProfitLoss = lazy(() => import('./pages/financial/ProfitLoss'));
const BalanceSheet = lazy(() => import('./pages/financial/BalanceSheet'));
const CashFlow = lazy(() => import('./pages/financial/CashFlow'));
const Budgeting = lazy(() => import('./pages/financial/Budgeting'));
const TaxManagement = lazy(() => import('./pages/financial/TaxManagement'));

// Páginas de Marketing
const Campaigns = lazy(() => import('./pages/marketing/Campaigns'));
const EmailMarketing = lazy(() => import('./pages/marketing/EmailMarketing'));
const ClientSegmentation = lazy(() => import('./pages/marketing/ClientSegmentation'));
const PurchaseHistory = lazy(() => import('./pages/marketing/PurchaseHistory'));
const ROIAnalysis = lazy(() => import('./pages/marketing/ROIAnalysis'));

// Páginas de Canales
const Channels = lazy(() => import('./pages/channels/Channels'));
const WhatsAppIntegration = lazy(() => import('./pages/channels/WhatsAppIntegration'));
const FacebookIntegration = lazy(() => import('./pages/channels/FacebookIntegration'));
const InstagramIntegration = lazy(() => import('./pages/channels/InstagramIntegration'));
const MessagingIntegration = lazy(() => import('./pages/channels/MessagingIntegration'));

// Páginas de Analítica
const AnalyticsDashboard = lazy(() => import('./pages/analytics/AnalyticsDashboard'));
const SalesAnalytics = lazy(() => import('./pages/analytics/SalesAnalytics'));
const InventoryAnalytics = lazy(() => import('./pages/analytics/InventoryAnalytics'));
const CustomerAnalytics = lazy(() => import('./pages/analytics/CustomerAnalytics'));
const RealTimeAnalytics = lazy(() => import('./pages/analytics/RealTimeAnalytics'));

// Páginas de Administración
const AdminBusinesses = lazy(() => import('./pages/admin/AdminBusinesses'));
const AdminPlans = lazy(() => import('./pages/admin/AdminPlans'));
const AdminBilling = lazy(() => import('./pages/admin/AdminBilling'));
const AdminRoles = lazy(() => import('./pages/admin/AdminRoles'));
const AdminAuditLog = lazy(() => import('./pages/admin/AdminAuditLog'));
const SystemSettings = lazy(() => import('./pages/admin/SystemSettings'));

// Utilidades
import { PERMISSIONS } from './utils/roles';

// Estilos
import './App.css';
import theme from './styles/theme';

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            
            {/* Empresas */}
            <Route path="/companies" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_OWN_BUSINESSES}>
                  <Companies />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/companies/:id" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_OWN_BUSINESSES}>
                  <CompanyDetail />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== VENTAS ==================== */}
            <Route path="/sales" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <Sales />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/sales/new" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_SALES}>
                  <NewSale />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/sales/tables" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_SALES}>
                  <TablesManagement />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/sales/channels" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_SALES}>
                  <SalesChannels />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/sales/by-seller" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <SalesBySeller />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/sales/by-product" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <SalesByProduct />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== INVENTARIO ==================== */}
            <Route path="/inventory/products" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_INVENTORY}>
                  <InventoryProducts />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/inventory/recipes" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_INVENTORY}>
                  <RecipesCombos />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/inventory/movements" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_INVENTORY}>
                  <InventoryMovements />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/inventory/adjustments" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_INVENTORY}>
                  <Adjustments />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/inventory/transfers" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_INVENTORY}>
                  <Transfers />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/inventory/alerts" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_INVENTORY}>
                  <StockAlerts />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== CUENTAS ==================== */}
            <Route path="/accounts/banks" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <Banks />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/accounts/reconciliation" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <Reconciliation />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/accounts/payables" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <Payables />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/accounts/receivables" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <Receivables />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/accounts/history" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <AccountsHistory />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== FINANZAS ==================== */}
            <Route path="/financial/balance-sheet" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <BalanceSheet />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/financial/profit-loss" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <ProfitLoss />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/financial/cash-flow" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <CashFlow />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/financial/fixed-variable-costs" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <FixedVariableCosts />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/financial/expense-management" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <FixedVariableExpenses />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/financial/budgeting" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <Budgeting />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/financial/taxes" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <TaxManagement />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/financial/reports" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_FINANCIAL_DATA}>
                  <FinancialReports />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== MARKETING ==================== */}
            <Route path="/marketing/clients" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_MARKETING}>
                  <Clients />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/marketing/segmentation" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_MARKETING}>
                  <ClientSegmentation />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/marketing/purchase-history" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_MARKETING}>
                  <PurchaseHistory />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/marketing/campaigns" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_MARKETING}>
                  <Campaigns />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/marketing/email" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_MARKETING}>
                  <EmailMarketing />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/marketing/roi-analysis" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_MARKETING}>
                  <ROIAnalysis />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== CANALES ==================== */}
            <Route path="/channels" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_CHANNELS}>
                  <Channels />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/channels/whatsapp" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_CHANNELS}>
                  <WhatsAppIntegration />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/channels/facebook" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_CHANNELS}>
                  <FacebookIntegration />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/channels/instagram" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_CHANNELS}>
                  <InstagramIntegration />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/channels/messaging" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_CHANNELS}>
                  <MessagingIntegration />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== ANALÍTICA ==================== */}
            <Route path="/analytics/dashboard" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_STATISTICS}>
                  <AnalyticsDashboard />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/analytics/sales" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_STATISTICS}>
                  <SalesAnalytics />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/analytics/inventory" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_STATISTICS}>
                  <InventoryAnalytics />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/analytics/customers" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_STATISTICS}>
                  <CustomerAnalytics />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/analytics/realtime" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_STATISTICS}>
                  <RealTimeAnalytics />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== ADMINISTRACIÓN ==================== */}
            <Route path="/admin/businesses" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.VIEW_ALL_BUSINESSES}>
                  <AdminBusinesses />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/admin/plans" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                  <AdminPlans />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/admin/billing" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                  <AdminBilling />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/admin/users" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                  <Users />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/admin/roles" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                  <AdminRoles />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/admin/audit-log" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                  <AdminAuditLog />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/admin/system-settings" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                  <SystemSettings />
                </RoleRoute>
              </RequireAuth>
            } />
            
            {/* ==================== OTRAS RUTAS ==================== */}
            <Route path="/services" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_INVENTORY}>
                  <Services />
                </RoleRoute>
              </RequireAuth>
            } />
            
            <Route path="/interactions" element={
              <RequireAuth>
                <Interactions />
              </RequireAuth>
            } />
            
            <Route path="/ai-flows" element={
              <RequireAuth>
                <AIFlows />
              </RequireAuth>
            } />
            
            <Route path="/settings" element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            } />
            
            <Route path="/plan-management" element={
              <RequireAuth>
                <RoleRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
                  <PlanManagement />
                </RoleRoute>
              </RequireAuth>
            } />

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BusinessProvider>
          <BusinessProviderV2>
            <CustomThemeProvider>
              <WebSocketProvider>
                <AppContent />
              </WebSocketProvider>
            </CustomThemeProvider>
          </BusinessProviderV2>
        </BusinessProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
