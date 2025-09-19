import { useOptimizedData } from './useOptimizedData';

// Datos de demo para fallback
const demoBusinesses = [
  { 
    id: 1, 
    name: "Mi Tienda Online", 
    industry: "ecommerce", 
    status: "active", 
    revenue: 1850.50,
    monthlyGrowth: "+15%",
    customers: 124,
    config: { logo: null },
    phone: "+1234567890",
    email: "contacto@mitienda.com",
    website: "www.mitienda.com",
    address: "Av. Principal #123",
    integrations: {
      whatsapp: { active: true, connected: true },
      facebook: { active: false, connected: false },
      instagram: { active: false, connected: false }
    }
  }
];

export const useBusinesses = () => {
  const {
    data: businesses,
    loading,
    error,
    fetchData: fetchBusinesses,
    createItem: createBusiness,
    updateItem: updateBusiness,
    deleteItem: deleteBusiness
  } = useOptimizedData('/api/businesses', demoBusinesses);

  return {
    businesses,
    loading,
    error,
    fetchBusinesses,
    createBusiness,
    updateBusiness,
    deleteBusiness
  };
};