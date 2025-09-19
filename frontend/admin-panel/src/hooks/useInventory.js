// frontend/admin-panel/src/hooks/useInventory.js
import { useState, useEffect } from 'react';

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockInventory = [
        { id: 1, name: 'Producto Premium', price: 299.99, stock: 15, sku: 'SKU-001', taxRate: 0.16 },
        { id: 2, name: 'Kit Herramientas', price: 89.99, stock: 8, sku: 'SKU-002', taxRate: 0.16 },
        { id: 3, name: 'Accesorio Oficina', price: 49.99, stock: 25, sku: 'SKU-003', taxRate: 0.16 },
        { id: 4, name: 'Software Empresarial', price: 199.99, stock: 12, sku: 'SKU-004', taxRate: 0.16 },
        { id: 5, name: 'Consumibles', price: 29.99, stock: 50, sku: 'SKU-005', taxRate: 0.16 }
      ];

      setInventory(mockInventory);
    } catch (err) {
      setError(err.message);
      setInventory([]); // Asegurar que siempre sea un array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return {
    inventory,
    loading,
    error,
    refetch: fetchInventory
  };
};