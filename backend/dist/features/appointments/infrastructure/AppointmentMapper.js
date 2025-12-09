"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentMapper = void 0;
const Appointment_1 = __importDefault(require("../domain/Appointment"));
/**
 * Mapper between persistence (Prisma) records, domain entities and API DTOs
 */
class AppointmentMapper {
    static toDomainFromPersistence(record) {
        return new Appointment_1.default({
            id: record.id,
            customerId: record.customerId ?? null,
            clientName: record.customer?.name ?? null,
            vehiclePlate: record.vehicle?.plate ?? null,
            scheduledAt: record.scheduledAt instanceof Date ? record.scheduledAt : new Date(record.scheduledAt),
            status: record.status,
            description: record.description ?? (record.service ? record.service.name : null),
            followUpOf: record.followUpOf ?? null,
            mechanicId: record.mechanicId ?? null,
            mechanicName: record.mechanic?.name ?? null,
        });
    }
    static toDTO(appointment) {
        return {
            id: appointment.id ?? undefined,
            customer_id: appointment.customerId ?? null,
            client_name: appointment.clientName,
            vehicle_plate: appointment.vehiclePlate,
            scheduled_at: appointment.scheduledAt.toISOString(),
            status: appointment.status,
            description: appointment.description ?? null,
            mechanic_id: appointment.mechanicId ?? null,
            mechanic_name: appointment.mechanicName ?? null,
        };
    }
}
exports.AppointmentMapper = AppointmentMapper;
exports.default = AppointmentMapper;
