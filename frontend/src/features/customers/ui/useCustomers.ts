import { useState, useEffect, useCallback } from 'react';
import { CustomerRepository } from '../infrastructure/CustomerRepository';
import type { Customer } from '../domain/Customer';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const repo = new CustomerRepository();
      const data = await repo.getCustomers();
      setCustomers(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, error, refresh: fetchCustomers };
};
