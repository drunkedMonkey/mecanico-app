export interface CreateCustomerDTO {
  name: string;
  firstName?: string;
  firstSurname?: string;
  secondSurname?: string;
  identifier?: string;
  identifierType?: 'NIF' | 'CIF' | 'PASSPORT';
  address?: string;
  email?: string;
  phone?: string;
  vehicles?: { brand: string; model: string; plate: string }[];
}

export type UpdateCustomerDTO = Partial<CreateCustomerDTO>;

export interface AddVehicleDTO {
  brand: string;
  model: string;
  plate: string;
}
