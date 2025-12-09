import { useState, useEffect, useCallback } from 'react';
import type { Employee } from '../domain/Employee';
import { EmployeeRepository } from '../infrastructure/EmployeeRepository';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const repository = new EmployeeRepository();
      const data = await repository.getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los empleados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, loading, error, refresh: fetchEmployees };
};
