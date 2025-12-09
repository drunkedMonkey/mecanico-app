"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAppointmentRepository = void 0;
const AppointmentRepository_1 = __importDefault(require("../domain/AppointmentRepository"));
const client_1 = require("@prisma/client");
const AppointmentMapper_1 = __importDefault(require("./AppointmentMapper"));
const prisma = new client_1.PrismaClient();
class PrismaAppointmentRepository extends AppointmentRepository_1.default {
    async findAll(filters = {}) {
        const where = {};
        // Search text across customer name or vehicle plate
        if (filters.q) {
            where.OR = [
                { customer: { name: { contains: String(filters.q), mode: 'insensitive' } } },
                { vehicle: { plate: { contains: String(filters.q), mode: 'insensitive' } } }
            ];
        }
        if (filters.status) {
            where.status = String(filters.status);
        }
        if (filters.mechanicId) {
            where.mechanicId = Number(filters.mechanicId);
        }
        if (filters.dateFrom || filters.dateTo) {
            where.scheduledAt = {};
            if (filters.dateFrom)
                where.scheduledAt.gte = new Date(filters.dateFrom);
            if (filters.dateTo)
                where.scheduledAt.lte = new Date(filters.dateTo);
        }
        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                customer: true,
                vehicle: true,
                service: true,
                mechanic: true,
            },
            orderBy: { scheduledAt: 'desc' }
        });
        return appointments.map(app => AppointmentMapper_1.default.toDomainFromPersistence(app));
    }
    async create({ customerId, client_name, vehicle_plate, scheduled_at, description, mechanic_id }) {
        let targetCustomerId = customerId ? Number(customerId) : null;
        if (!targetCustomerId && client_name) {
            const customer = await prisma.customer.upsert({
                where: { email: `user_${client_name.replace(/\s+/g, '').toLowerCase()}@example.com` },
                update: {},
                create: {
                    name: client_name,
                    email: `user_${client_name.replace(/\s+/g, '').toLowerCase()}@example.com`
                }
            });
            targetCustomerId = customer.id;
        }
        if (!targetCustomerId) {
            throw new Error('No se ha proporcionado un cliente válido');
        }
        const vehicle = await prisma.vehicle.create({
            data: {
                brand: 'Desconocida',
                model: 'Desconocido',
                plate: vehicle_plate,
                customerId: targetCustomerId
            }
        });
        // If mechanic_id is not provided, find the first available mechanic
        let assignedMechanicId = mechanic_id ? Number(mechanic_id) : undefined;
        if (!assignedMechanicId) {
            const firstMechanic = await prisma.employee.findFirst({ where: { deletedAt: null, role: 'MECHANIC' } });
            if (firstMechanic) {
                assignedMechanicId = firstMechanic.id;
            }
            else {
                // Fallback or throw error? For now let's assume there is at least one mechanic or let prisma fail if null
                // But prisma create needs an int.
                throw new Error('No hay mecánicos disponibles para asignar la cita');
            }
        }
        const appointment = await prisma.appointment.create({
            data: {
                customerId: targetCustomerId,
                vehicleId: vehicle.id,
                mechanicId: assignedMechanicId,
                serviceId: 1,
                scheduledAt: new Date(scheduled_at),
                status: 'scheduled',
                description: description || null
            },
            include: {
                customer: true,
                vehicle: true,
                service: true,
                mechanic: true
            }
        });
        return AppointmentMapper_1.default.toDomainFromPersistence(appointment);
    }
    async findById(id) {
        const appointment = await prisma.appointment.findUnique({
            where: { id: Number(id) },
            include: { customer: true, vehicle: true, service: true, mechanic: true }
        });
        if (!appointment)
            return null;
        return AppointmentMapper_1.default.toDomainFromPersistence(appointment);
    }
    async update(id, { client_name, vehicle_plate, scheduled_at, description, status, mechanic_id }) {
        // Update basic fields on appointment; for simplicity we update scheduledAt, description and status when provided
        const data = {};
        if (scheduled_at)
            data.scheduledAt = new Date(scheduled_at);
        if (description !== undefined)
            data.description = description;
        if (status !== undefined)
            data.status = status;
        if (mechanic_id)
            data.mechanicId = Number(mechanic_id);
        const updated = await prisma.appointment.update({
            where: { id: Number(id) },
            data,
            include: { customer: true, vehicle: true, service: true, mechanic: true }
        });
        return AppointmentMapper_1.default.toDomainFromPersistence(updated);
    }
    async softDelete(id) {
        // For appointments we treat softDelete as cancelling the appointment (status = 'cancelled')
        const cancelled = await prisma.appointment.update({
            where: { id: Number(id) },
            data: { status: 'cancelled' },
            include: { customer: true, vehicle: true, service: true, mechanic: true }
        });
        return AppointmentMapper_1.default.toDomainFromPersistence(cancelled);
    }
    async hardDelete(id) {
        await prisma.appointment.delete({
            where: { id: Number(id) }
        });
    }
}
exports.PrismaAppointmentRepository = PrismaAppointmentRepository;
exports.default = PrismaAppointmentRepository;
