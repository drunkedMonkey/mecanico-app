import CustomerRepository from '../domain/CustomerRepository';
import { PrismaClient } from '@prisma/client';
import Customer from '../domain/Customer';
import { CustomerDTO } from './CustomerDTO';
import { validateNIF, validateCIF } from '../../../shared/utils/validation';

const prisma = new PrismaClient();

export class PrismaCustomerRepository extends CustomerRepository {
  async findAll() {
    const customers = await prisma.customer.findMany({
      orderBy: { id: 'asc' },
      include: { vehicles: true }
    });

    return customers.map(c => new Customer({
      id: c.id,
      name: c.name,
      firstName: c.firstName,
      firstSurname: c.firstSurname,
      secondSurname: c.secondSurname,
      identifier: c.identifier,
      identifierType: c.identifierType,
      address: c.address,
      email: c.email,
      phone: c.phone,
      vehicles: c.vehicles
    }));
  }

  private validateIdentifier(identifier: string, type: string) {
    if (type === 'NIF') {
      if (!validateNIF(identifier)) throw new Error('NIF inválido');
    } else if (type === 'CIF') {
      if (!validateCIF(identifier)) throw new Error('CIF inválido');
    }
    // PASSPORT no validation
  }

  async create(data: CustomerDTO) {
    if (data.identifier && data.identifierType) {
      this.validateIdentifier(data.identifier, data.identifierType);
    }

    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        firstName: data.firstName,
        firstSurname: data.firstSurname,
        secondSurname: data.secondSurname,
        identifier: data.identifier,
        identifierType: data.identifierType,
        address: data.address,
        email: data.email,
        phone: data.phone,
        vehicles: {
          create: data.vehicles || []
        }
      },
      include: { vehicles: true }
    });
    return new Customer({ ...customer, vehicles: customer.vehicles });
  }

  async update(id: number | string, data: CustomerDTO) {
    if (data.identifier && data.identifierType) {
      this.validateIdentifier(data.identifier, data.identifierType);
    }

    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        firstName: data.firstName,
        firstSurname: data.firstSurname,
        secondSurname: data.secondSurname,
        identifier: data.identifier,
        identifierType: data.identifierType,
        address: data.address,
        email: data.email,
        phone: data.phone
      }
    });
    return new Customer(customer);
  }

  async delete(id: number | string) {
    const customerId = Number(id);
    
    // Transaction to delete related data first
    await prisma.$transaction([
      // Delete appointments
      prisma.appointment.deleteMany({
        where: { customerId }
      }),
      // Delete vehicles
      prisma.vehicle.deleteMany({
        where: { customerId }
      }),
      // Delete customer
      prisma.customer.delete({
        where: { id: customerId }
      })
    ]);
  }

  async addVehicle(customerId: number, data: { brand: string; model: string; plate: string }) {
    const vehicle = await prisma.vehicle.create({
      data: {
        customerId,
        brand: data.brand,
        model: data.model,
        plate: data.plate
      }
    });
    return vehicle;
  }

  async deleteVehicle(vehicleId: number) {
    await prisma.vehicle.delete({
      where: { id: vehicleId }
    });
  }
}

export default PrismaCustomerRepository;
