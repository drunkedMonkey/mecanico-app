export interface CustomerDTO {
  id?: number;
  name: string;
  firstName?: string | null;
  firstSurname?: string | null;
  secondSurname?: string | null;
  identifier?: string | null;
  identifierType?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  vehicles?: { brand: string; model: string; plate: string }[];
}
