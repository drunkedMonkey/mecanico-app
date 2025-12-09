import Customer from './Customer';
import type { CustomerDTO } from '../infrastructure/CustomerDTO';

export abstract class CustomerRepository {
  abstract findAll(): Promise<Customer[]>;
  abstract create(data: CustomerDTO): Promise<Customer>;
  abstract update(id: number | string, data: CustomerDTO): Promise<Customer>;
  abstract delete(id: number | string): Promise<void>;
  abstract addVehicle(customerId: number, data: { brand: string; model: string; plate: string }): Promise<any>;
  abstract deleteVehicle(vehicleId: number): Promise<void>;
}

export default CustomerRepository;
