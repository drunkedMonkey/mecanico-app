import Appointment from './Appointment';
import type { CreateAppointmentDTO } from '../infrastructure/AppointmentDTO';


export type AppointmentFilters = {
  q?: string;
  status?: string;
  mechanicId?: number | string;
  dateFrom?: string; // ISO
  dateTo?: string; // ISO
};

export abstract class AppointmentRepository {
  abstract create(appointmentData: CreateAppointmentDTO): Promise<Appointment>;
  abstract findAll(filters?: AppointmentFilters): Promise<Appointment[]>;
  abstract findById(id: number | string): Promise<Appointment | null>;
  abstract update(id: number | string, data: Partial<CreateAppointmentDTO> & { status?: string }): Promise<Appointment>;
  abstract softDelete(id: number | string): Promise<Appointment>;
  abstract hardDelete(id: number | string): Promise<void>;
}

export default AppointmentRepository;
