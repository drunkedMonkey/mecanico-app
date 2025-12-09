import { Appointment } from '../domain/Appointment';
import type { AppointmentStatus } from '../domain/AppointmentStatus';
import type { AppointmentDTO } from './AppointmentDTO';

export class AppointmentMapper {
  static toDomain(dto: AppointmentDTO): Appointment {
    return new Appointment(
      dto.id,
      dto.customer_id ?? null,
      dto.client_name,
      dto.vehicle_plate,
      new Date(dto.scheduled_at),
      dto.status as AppointmentStatus,
      dto.description,
      dto.mechanic_id,
      dto.mechanic_name,
    );
  }
}
