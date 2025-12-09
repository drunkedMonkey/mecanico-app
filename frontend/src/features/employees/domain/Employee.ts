export interface Employee {
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
