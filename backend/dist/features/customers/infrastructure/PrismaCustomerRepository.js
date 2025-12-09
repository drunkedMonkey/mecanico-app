"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCustomerRepository = void 0;
const CustomerRepository_1 = __importDefault(require("../domain/CustomerRepository"));
const client_1 = require("@prisma/client");
const Customer_1 = __importDefault(require("../domain/Customer"));
const validation_1 = require("../../../shared/utils/validation");
const prisma = new client_1.PrismaClient();
class PrismaCustomerRepository extends CustomerRepository_1.default {
    async findAll() {
        const customers = await prisma.customer.findMany({
            orderBy: { id: 'asc' },
            include: { vehicles: true }
        });
        return customers.map(c => new Customer_1.default({
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
    validateIdentifier(identifier, type) {
        if (type === 'NIF') {
            if (!(0, validation_1.validateNIF)(identifier))
                throw new Error('NIF inválido');
        }
        else if (type === 'CIF') {
            if (!(0, validation_1.validateCIF)(identifier))
                throw new Error('CIF inválido');
        }
        // PASSPORT no validation
    }
    async create(data) {
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
        return new Customer_1.default({ ...customer, vehicles: customer.vehicles });
    }
    async update(id, data) {
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
        return new Customer_1.default(customer);
    }
    async delete(id) {
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
    async addVehicle(customerId, data) {
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
    async deleteVehicle(vehicleId) {
        await prisma.vehicle.delete({
            where: { id: vehicleId }
        });
    }
}
exports.PrismaCustomerRepository = PrismaCustomerRepository;
exports.default = PrismaCustomerRepository;
