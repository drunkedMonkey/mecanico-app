import Appointment from '../domain/Appointment';
import type { AppointmentDTO } from './AppointmentDTO';

/**
 * Mapper between persistence (Prisma) records, domain entities and API DTOs
 */
export class AppointmentMapper {
  static toDomainFromPersistence(record: any): Appointment {
    return new Appointment({
      id: record.id,
      customerId: record.customerId ?? null,
      clientName: record.customer?.name ?? null,
      vehiclePlate: record.vehicle?.plate ?? null,
      scheduledAt: record.scheduledAt instanceof Date ? record.scheduledAt : new Date(record.scheduledAt),
      status: record.status as any,
      description: record.description ?? (record.service ? record.service.name : null),
      followUpOf: record.followUpOf ?? null,
      mechanicId: record.mechanicId ?? null,
      mechanicName: record.mechanic?.name ?? null,
    });
  }

  static toDTO(appointment: Appointment): AppointmentDTO {
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

export default AppointmentMapper;
