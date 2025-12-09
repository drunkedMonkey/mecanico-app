export interface CreateEmployeeDTO {
  name: string;
  firstName?: string;
  firstSurname?: string;
  secondSurname?: string;
  dni?: string;
  email?: string;
  phone?: string;
  role?: 'MECHANIC' | 'ADMIN' | 'BACKOFFICE';
}

export interface EmployeeDTO {
  id: number;
  name: string;
  firstName?: string;
  firstSurname?: string;
  secondSurname?: string;
  dni?: string;
  email?: string;
  phone?: string;
  employeeCode?: string;
  role?: 'MECHANIC' | 'ADMIN' | 'BACKOFFICE';
  deletedAt?: string | null;
}

export default EmployeeDTO;
