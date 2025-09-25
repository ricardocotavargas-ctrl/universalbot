// frontend/admin-panel/src/utils/roles.js
export const ROLES = {
  SUPERADMIN: 'admin',
  CLIENT: 'client',
  DEMO: 'demo'
};

export const PERMISSIONS = {
  VIEW_ALL_BUSINESSES: 'view_all_businesses',
  VIEW_OWN_BUSINESSES: 'view_own_businesses',
  VIEW_FINANCIAL_DATA: 'view_financial_data',
  VIEW_SAMPLE_DATA: 'view_sample_data',
  EDIT_ALL_BUSINESSES: 'edit_all_businesses',
  EDIT_OWN_BUSINESSES: 'edit_own_businesses',
  DELETE_BUSINESSES: 'delete_businesses',
  MANAGE_USERS: 'manage_users',
  MANAGE_INVENTORY: 'manage_inventory',
  SIMULATE_ACTIONS: 'simulate_actions',
  NO_PERSISTENCE: 'no_persistence'
};

export const hasPermission = (user, requiredPermission) => {
  if (!user || !user.role) return false;
  
  // Superadmin tiene todos los permisos
  if (user.role === ROLES.SUPERADMIN) return true;
  
  // Demo users tienen permisos de muestra
  if (user.role === ROLES.DEMO) {
    const demoPermissions = [
      PERMISSIONS.VIEW_SAMPLE_DATA,
      PERMISSIONS.SIMULATE_ACTIONS,
      PERMISSIONS.NO_PERSISTENCE,
      PERMISSIONS.VIEW_OWN_BUSINESSES,
      PERMISSIONS.VIEW_FINANCIAL_DATA
    ];
    return demoPermissions.includes(requiredPermission);
  }
  
  // Clientes tienen permisos básicos
  if (user.role === ROLES.CLIENT) {
    const clientPermissions = [
      PERMISSIONS.VIEW_OWN_BUSINESSES,
      PERMISSIONS.EDIT_OWN_BUSINESSES,
      PERMISSIONS.VIEW_FINANCIAL_DATA,
      PERMISSIONS.MANAGE_INVENTORY
    ];
    return clientPermissions.includes(requiredPermission);
  }
  
  return false;
};

export const canViewBusiness = (user, businessOwnerId) => {
  if (!user) return false;
  
  if (hasPermission(user, PERMISSIONS.VIEW_ALL_BUSINESSES)) {
    return true;
  }
  
  if (hasPermission(user, PERMISSIONS.VIEW_OWN_BUSINESSES)) {
    return businessOwnerId === user.id;
  }
  
  if (hasPermission(user, PERMISSIONS.VIEW_SAMPLE_DATA)) {
    return true;
  }
  
  return false;
};
