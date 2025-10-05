// frontend/admin-panel/src/utils/navigationConfig.js
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
  TableRestaurant,
  Store,
  History,
  Restaurant,
  List as ListIcon,
  AccountBalanceWallet,
  Receipt,
  Analytics,
  Timeline,
  People,
  Email,
  Facebook,
  Instagram,
  WhatsApp,
  Business,
  AttachMoney,
  People as PeopleIcon,
  Chat,
  Assessment,
  AccountTree,
  ReceiptLong,
  ShowChart,
  PieChart as PieChartIcon,
  Calculate,
  Campaign as CampaignIcon,
  ThumbUp,
  InsertChart,
  AccountCircle,
  CompareArrows,
  Savings,
  CorporateFare,
  Receipt as ReceiptIcon,
  CreditCard,
  TrendingFlat,
  AccountBox,
  Work,
  Description,
  ContactMail,
  Groups,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  PieChart,
  DonutLarge,
  StackedLineChart,
  Money,
  LocalAtm,
  EuroSymbol,
  CurrencyExchange
} from '@mui/icons-material';
import Dashboard from '@mui/icons-material/Dashboard';

export const navigationConfig = {
  main: [
    {
      type: 'item',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      exact: true
    },
    {
      type: 'group',
      label: 'Ventas',
      icon: PointOfSale,
      items: [
        {
          type: 'item',
          label: 'Nueva Venta',
          icon: Add,
          path: '/sales/new'
        },
        {
          type: 'item',
          label: 'Canales de Venta',
          icon: Store,
          path: '/sales/channels'
        },
        {
          type: 'subgroup',
          label: 'Historiales',
          icon: History,
          items: [
            {
              type: 'item',
              label: 'Registro de Ventas',
              icon: ReceiptLong,
              path: '/sales'
            },
            {
              type: 'item',
              label: 'Ventas por Vendedor',
              icon: PeopleIcon,
              path: '/sales/by-seller'
            },
            {
              type: 'item',
              label: 'Ventas por Producto',
              icon: Inventory,
              path: '/sales/by-product'
            }
          ]
        }
      ]
    },
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
          type: 'subgroup',
          label: 'Movimientos',
          icon: CompareArrows,
          items: [
            {
              type: 'item',
              label: 'Ajustes de Inventario',
              icon: AccountTree,
              path: '/inventory/adjustments'
            },
            {
              type: 'item',
              label: 'Traslados',
              icon: TrendingFlat,
              path: '/inventory/transfers'
            },
            {
              type: 'item',
              label: 'Historial de Movimientos',
              icon: History,
              path: '/inventory/movements'
            }
          ]
        },
        {
          type: 'item',
          label: 'Alertas de Stock',
          icon: Assessment,
          path: '/inventory/alerts'
        }
      ]
    },
    {
      type: 'group',
      label: 'Cuentas',
      icon: AccountBalance,
      items: [
        {
          type: 'subgroup',
          label: 'Bancos y Efectivo',
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
            }
          ]
        },
        {
          type: 'subgroup',
          label: 'Gestión de Deudas',
          icon: Receipt,
          items: [
            {
              type: 'item',
              label: 'Cuentas por Pagar',
              icon: AccountBalanceWallet,
              path: '/accounts/payables'
            },
            {
              type: 'item',
              label: 'Cuentas por Cobrar',
              icon: ReceiptLong,
              path: '/accounts/receivables'
            }
          ]
        },
        {
          type: 'item',
          label: 'Historial Completo',
          icon: History,
          path: '/accounts/history'
        }
      ]
    },
    {
      type: 'group',
      label: 'Finanzas',
      icon: TrendingUp,
      items: [
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
              icon: TrendingFlat,
              path: '/financial/cash-flow'
            }
          ]
        },
        {
          type: 'subgroup',
          label: 'Gestión de Costos',
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
              label: 'Control de Gastos',
              icon: ReceiptIcon,
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
    {
      type: 'group',
      label: 'Marketing',
      icon: Campaign,
      items: [
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
              icon: AnalyticsIcon,
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
        {
          type: 'subgroup',
          label: 'Campañas',
          icon: CampaignIcon,
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
              icon: AssessmentIcon,
              path: '/marketing/roi-analysis'
            }
          ]
        },
        {
          type: 'subgroup',
          label: 'Redes Sociales',
          icon: WhatsApp,
          items: [
            {
              type: 'item',
              label: 'WhatsApp Business',
              icon: WhatsApp,
              path: '/channels/whatsapp'
            },
            {
              type: 'item',
              label: 'Facebook Manager',
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
              label: 'Mensajería Integrada',
              icon: Chat,
              path: '/channels/messaging'
            }
          ]
        }
      ]
    },
    {
      type: 'group',
      label: 'Analítica',
      icon: InsertChart,
      items: [
        {
          type: 'item',
          label: 'Dashboard Principal',
          icon: Dashboard,
          path: '/analytics/dashboard'
        },
        {
          type: 'subgroup',
          label: 'Reportes Avanzados',
          icon: BarChart,
          items: [
            {
              type: 'item',
              label: 'Ventas y Rentabilidad',
              icon: TrendingUp,
              path: '/analytics/sales'
            },
            {
              type: 'item',
              label: 'Inventario y Stock',
              icon: Inventory,
              path: '/analytics/inventory'
            },
            {
              type: 'item',
              label: 'Clientes y Fidelización',
              icon: People,
              path: '/analytics/customers'
            }
          ]
        },
        {
          type: 'item',
          label: 'Estadísticas en Tiempo Real',
          icon: ShowChart,
          path: '/analytics/realtime'
        }
      ]
    },
    {
      type: 'item',
      label: 'Inteligencia Artificial',
      icon: SmartToy,
      path: '/ai-flows',
      badge: 'Nuevo'
    },
    {
      type: 'item',
      label: 'Configuración',
      icon: Settings,
      path: '/settings'
    }
  ],

  admin: [
    {
      type: 'subgroup',
      label: 'Gestión de Negocios',
      icon: Business,
      items: [
        {
          type: 'item',
          label: 'Todos los Negocios',
          icon: CorporateFare,
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
};

// Función para obtener items basado en el rol
export const getNavigationItems = (userRole) => {
  const items = [...navigationConfig.main];
  
  if (userRole === 'superadmin' || userRole === 'admin') {
    // Insertar items de admin después del Dashboard
    items.splice(1, 0, ...navigationConfig.admin);
  }
  
  return items;
};

// Función para obtener breadcrumbs basados en la ruta
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

// Función para obtener la configuración de una ruta específica
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

export default navigationConfig;
