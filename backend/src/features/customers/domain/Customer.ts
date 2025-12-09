export default class Customer {
  readonly id: number;
  readonly name: string;
  readonly firstName: string | null;
  readonly firstSurname: string | null;
  readonly secondSurname: string | null;
  readonly identifier: string | null;
  readonly identifierType: string | null;
  readonly address: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly vehicles: any[];

  constructor({ 
    id, name, firstName, firstSurname, secondSurname, identifier, identifierType, address, email, phone, vehicles = []
  }: { 
    id: number; 
    name: string; 
    firstName?: string | null;
    firstSurname?: string | null;
    secondSurname?: string | null;
    identifier?: string | null;
    identifierType?: string | null;
    address?: string | null;
    email: string | null; 
    phone: string | null;
    vehicles?: any[];
  }) {
    this.id = id;
    this.name = name;
    this.firstName = firstName ?? null;
    this.firstSurname = firstSurname ?? null;
    this.secondSurname = secondSurname ?? null;
    this.identifier = identifier ?? null;
    this.identifierType = identifierType ?? null;
    this.address = address ?? null;
    this.email = email;
    this.phone = phone;
    this.vehicles = vehicles;
  }
}
