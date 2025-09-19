// frontend/admin-panel/src/hooks/usePermissions.js
import { useAuth } from '../contexts/AuthContext';
import { 
  getUserPermissions, 
  hasPermission, 
  canViewBusiness,
  getRoleDisplayName 
} from '../utils/roles';

export const usePermissions = () => {
  const { user } = useAuth();

  const userPermissions = getUserPermissions(user);
  
  const hasPermissionFn = (permission) => hasPermission(user, permission);
  
  const canViewBusinessFn = (businessOwnerId) => canViewBusiness(user, businessOwnerId);
  
  const getRoleName = () => getRoleDisplayName(user?.role);

  return {
    userPermissions,
    hasPermission: hasPermissionFn,
    canViewBusiness: canViewBusinessFn,
    getRoleName,
    isSuperAdmin: user?.role === 'superadmin',
    isClient: user?.role === 'client',
    isDemo: user?.role === 'demo'
  };
};

export default usePermissions;