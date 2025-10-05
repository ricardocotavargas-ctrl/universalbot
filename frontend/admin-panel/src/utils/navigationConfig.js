// frontend/admin-panel/src/utils/navigationConfig.js - VERSIÓN CORREGIDA Y OPTIMIZADA
import {
  Home,
  PointOfSale,
  Inventory,
  AccountBalance,
  TrendingUp,
  Campaign,
  BarChart,
  SmartToy,
  Settings,
  Add,
  History,
  People,
  Email,
  Facebook,
  Instagram,
  WhatsApp,
  Business,
  AttachMoney,
  Chat,
  AccountTree,
  ReceiptLong,
  ShowChart,
  Analytics,
  CompareArrows,
  Savings,
  CorporateFare,
  CreditCard,
  Groups,
  Assessment,
  InsertChart,
  Dashboard as DashboardIcon,
  Receipt,
  Description,
  AccountBox,
  Work,
  Store,
  Group,
  Timeline,
  PieChart
} from '@mui/icons-material';

export const navigationConfig = {
  main: [
    {
      type: 'item',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      exact: true
    },
    
    // ==================== VENTAS - REORGANIZADO ====================
    {
      type: 'group',
      label: 'Ventas',
      icon: PointOfSale,
      items: [
        {
          type: 'item',
          label: 'Nueva Venta',
          icon: Add,
          path: '/sales/new',
          highlight: true
        },
        {
          type: 'item',
          label: 'Registro de Ventas',
          icon: ReceiptLong,
          path: '/sales'
        },
        {
          type: 'item',
          label: 'Base de Clientes',
          icon: Group,
          path: '/sales/customers'
        },
        {
          type: 'item',
          label: 'Historial y Estadísticas',
          icon: Timeline,
          path: '/sales/history'
        }
      ]
    },
    
    // ==================== INVENTARIO - OPTIMIZADO ====================
    {
      type: 'group',
      label: 'Inventario',
      icon: Inventory,
      items: [
        {
          type: 'item',
          label: 'Gestión de Productos',
          icon: Inventory,
          path: '/inventory/products'
        },
        {
          type: 'item',
          label: 'Movimientos',
          icon: CompareArrows,
          path: '/inventory/movements'
        },
        {
          type: 'item',
          label: 'Ajustes',
          icon: AccountTree,
          path: '/inventory/adjustments'
        },
        {
          type: 'item',
          label: 'Traslados',
          icon: TrendingUp,
          path: '/inventory/transfers'
        },
        {
          type: 'item',
          label: 'Alertas de Stock',
          icon: Assessment,
          path: '/inventory/alerts'
        }
      ]
    },
    
    // ==================== FINANZAS - REORGANIZADO ====================
    {
      type: 'group',
      label: 'Finanzas',
      icon: TrendingUp,
      items: [
        // Estados Financieros
        {
          type: 'subgroup',
          label: 'Estados Financieros',
          icon: Description,
          items: [
            {
              type: 'item',
              label: 'Balance General',
              icon: CorporateFare,
              path: '/financial/balance-sheet'
            },
            {
              type: 'item',
              label: 'Estado de Resultados',
              icon: Analytics,
              path: '/financial/profit-loss'
            },
            {
              type: 'item',
              label: 'Flujo de Efectivo',
              icon: ShowChart,
              path: '/financial/cash-flow'
            }
          ]
        },
        
        // Gestión de Costos
        {
          type: 'subgroup',
          label: 'Control de Costos',
          icon: Receipt,
          items: [
            {
              type: 'item',
              label: 'Costos Fijos/Variables',
              icon: CompareArrows,
              path: '/financial/fixed-variable-costs'
            },
            {
              type: 'item',
              label: 'Gestión de Gastos',
              icon: ReceiptLong,
              path: '/financial/expense-management'
            },
            {
              type: 'item',
              label: 'Presupuestos',
              icon: Savings,
              path: '/financial/budgeting'
            }
          ]
        },
        
        // Reportes
        {
          type: 'item',
          label: 'Reportes Financieros',
          icon: BarChart,
          path: '/financial/reports'
        },
        {
          type: 'item',
          label: 'Gestión de Impuestos',
          icon: AccountBalance,
          path: '/financial/taxes'
        }
      ]
    },
    
    // ==================== CUENTAS - SIMPLIFICADO ====================
    {
      type: 'group',
      label: 'Cuentas',
      icon: AccountBalance,
      items: [
        {
          type: 'item',
          label: 'Cuentas Bancarias',
          icon: CreditCard,
          path: '/accounts/banks'
        },
        {
          type: 'item',
          label: 'Conciliación',
          icon: CompareArrows,
          path: '/accounts/reconciliation'
        },
        {
          type: 'item',
          label: 'Cuentas por Pagar',
          icon: AccountBalance,
          path: '/accounts/payables'
        },
        {
          type: 'item',
          label: 'Cuentas por Cobrar',
          icon: Receipt,
          path: '/accounts/receivables'
        },
        {
          type: 'item',
          label: 'Historial',
          icon: History,
          path: '/accounts/history'
        }
      ]
    },
    
    // ==================== MARKETING - REORGANIZADO ====================
    {
      type: 'group',
      label: 'Marketing',
      icon: Campaign,
      items: [
        // Gestión de Clientes
        {
          type: 'subgroup',
          label: 'Gestión de Clientes',
          icon: People,
          items: [
            {
              type: 'item',
              label: 'Base de Datos',
              icon: Groups,
              path: '/marketing/clients'
            },
            {
              type: 'item',
              label: 'Segmentación',
              icon: Analytics,
              path: '/marketing/segmentation'
            },
            {
              type: 'item',
              label: 'Historial de Compras',
              icon: History,
              path: '/marketing/purchase-history'
            }
          ]
        },
        
        // Campañas
        {
          type: 'subgroup',
          label: 'Campañas',
          icon: Campaign,
          items: [
            {
              type: 'item',
              label: 'Gestión de Campañas',
              icon: Campaign,
              path: '/marketing/campaigns'
            },
            {
              type: 'item',
              label: 'Email Marketing',
              icon: Email,
              path: '/marketing/email'
            },
            {
              type: 'item',
              label: 'Análisis de ROI',
              icon: BarChart,
              path: '/marketing/roi-analysis'
            }
          ]
        }
      ]
    },
    
    // ==================== CANALES - SIMPLIFICADO ====================
    {
      type: 'group',
      label: 'Canales',
      icon: Store,
      items: [
        {
          type: 'item',
          label: 'Todos los Canales',
          icon: Store,
          path: '/channels'
        },
        {
          type: 'item',
          label: 'WhatsApp Business',
          icon: WhatsApp,
          path: '/channels/whatsapp'
        },
        {
          type: 'item',
          label: 'Facebook',
          icon: Facebook,
          path: '/channels/facebook'
        },
        {
          type: 'item',
          label: 'Instagram',
          icon: Instagram,
          path: '/channels/instagram'
        },
        {
          type: 'item',
          label: 'Mensajería',
          icon: Chat,
          path: '/channels/messaging'
        }
      ]
    },
    
    // ==================== ANALÍTICA - OPTIMIZADO ====================
    {
      type: 'group',
      label: 'Analítica',
      icon: InsertChart,
      items: [
        {
          type: 'item',
          label: 'Dashboard Principal',
          icon: DashboardIcon,
          path: '/analytics/dashboard'
        },
        {
          type: 'item',
          label: 'Análisis de Ventas',
          icon: TrendingUp,
          path: '/analytics/sales'
        },
        {
          type: 'item',
          label: 'Análisis de Inventario',
          icon: Inventory,
          path: '/analytics/inventory'
        },
        {
          type: 'item',
          label: 'Análisis de Clientes',
          icon: People,
          path: '/analytics/customers'
        },
        {
          type: 'item',
          label: 'Tiempo Real',
          icon: ShowChart,
          path: '/analytics/realtime'
        }
      ]
    },
    
    // ==================== SERVICIOS ADICIONALES ====================
    {
      type: 'item',
      label: 'Inteligencia Artificial',
      icon: SmartToy,
      path: '/ai-flows',
      badge: 'Nuevo'
    },
    {
      type: 'item',
      label: 'Interacciones',
      icon: Chat,
      path: '/interactions'
    },
    {
      type: 'item',
      label: 'Servicios',
      icon: Business,
      path: '/services'
    },
    
    // ==================== CONFIGURACIÓN ====================
    {
      type: 'item',
      label: 'Configuración',
      icon: Settings,
      path: '/settings'
    }
  ],

  // ==================== ADMINISTRACIÓN - SEPARADO ====================
  admin: [
    {
      type: 'group',
      label: 'Administración del Sistema',
      icon: Business,
      items: [
        {
          type: 'subgroup',
          label: 'Gestión de Negocios',
          icon: CorporateFare,
          items: [
            {
              type: 'item',
              label: 'Todos los Negocios',
              icon: Business,
              path: '/admin/businesses'
            },
            {
              type: 'item',
              label: 'Planes y Suscripciones',
              icon: AttachMoney,
              path: '/admin/plans'
            },
            {
              type: 'item',
              label: 'Facturación',
              icon: Receipt,
              path: '/admin/billing'
            }
          ]
        },
        {
          type: 'subgroup',
          label: 'Gestión de Usuarios',
          icon: People,
          items: [
            {
              type: 'item',
              label: 'Usuarios del Sistema',
              icon: AccountBox,
              path: '/admin/users'
            },
            {
              type: 'item',
              label: 'Roles y Permisos',
              icon: Work,
              path: '/admin/roles'
            },
            {
              type: 'item',
              label: 'Registro de Actividades',
              icon: History,
              path: '/admin/audit-log'
            }
          ]
        },
        {
          type: 'item',
          label: 'Configuración del Sistema',
          icon: Settings,
          path: '/admin/system-settings'
        }
      ]
    }
  ]
};

// ==================== FUNCIONES UTILITARIAS ====================

/**
 * Obtiene los items de navegación basados en el rol del usuario
 */
export const getNavigationItems = (userRole) => {
  const items = [...navigationConfig.main];
  
  // Solo superadmin y admin ven el panel de administración
  if (userRole === 'superadmin' || userRole === 'admin') {
    // Insertar panel de admin después del Dashboard
    items.splice(1, 0, ...navigationConfig.admin);
  }
  
  return items;
};

/**
 * Obtiene los breadcrumbs basados en la ruta actual
 */
export const getBreadcrumbs = (pathname) => {
  const breadcrumbs = [];
  const allItems = [...navigationConfig.main, ...navigationConfig.admin];
  
  const findItemByPath = (items, path) => {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.items) {
        const found = findItemByPath(item.items, path);
        if (found) {
          breadcrumbs.unshift(item);
          return found;
        }
      }
    }
    return null;
  };
  
  const currentItem = findItemByPath(allItems, pathname);
  if (currentItem) {
    breadcrumbs.push(currentItem);
  }
  
  return breadcrumbs;
};

/**
 * Obtiene la configuración de una ruta específica
 */
export const getRouteConfig = (path) => {
  const allItems = [...navigationConfig.main, ...navigationConfig.admin];
  
  const findItem = (items) => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.items) {
        const found = findItem(item.items);
        if (found) return found;
      }
    }
    return null;
  };
  
  return findItem(allItems);
};

/**
 * Obtiene las rutas principales para breadcrumbs rápidos
 */
export const getQuickNavigation = (currentPath) => {
  const mainSections = navigationConfig.main.filter(item => 
    item.type === 'group' || item.type === 'item'
  );
  
  return mainSections.map(section => ({
    label: section.label,
    icon: section.icon,
    path: section.path || (section.items && section.items[0]?.path) || '/dashboard'
  }));
};

export default navigationConfig;
