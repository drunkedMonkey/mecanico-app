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

export type UpdateEmployeeDTO = Partial<CreateEmployeeDTO>;
