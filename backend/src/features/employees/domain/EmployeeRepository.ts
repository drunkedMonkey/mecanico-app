import Employee from './Employee';
import type { CreateEmployeeDTO } from '../infrastructure/EmployeeDTO';

export abstract class EmployeeRepository {
  abstract findAll(): Promise<Employee[]>;
  abstract create(data: CreateEmployeeDTO): Promise<Employee>;
  abstract update(id: number | string, data: CreateEmployeeDTO): Promise<Employee>;
  abstract softDelete(id: number | string): Promise<void>;
  abstract restore(id: number | string): Promise<void>;
}

export default EmployeeRepository;
