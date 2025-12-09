export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  plate: string;
}

export interface Customer {
  id: number;
  name: string;
  firstName?: string;
  firstSurname?: string;
  secondSurname?: string;
  identifier?: string;
  identifierType?: 'NIF' | 'CIF' | 'PASSPORT';
  address?: string;
  email?: string;
  phone?: string;
  vehicles?: Vehicle[];
}
