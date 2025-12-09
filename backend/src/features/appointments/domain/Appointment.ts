export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type AppointmentStatus = typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS];

export interface AppointmentProps {
  id?: number | null;
  customerId?: number | null;
  clientName: string;
  vehiclePlate: string;
  scheduledAt: Date;
  status?: AppointmentStatus;
  description?: string | null;
  followUpOf?: number | null;
  mechanicId?: number | null;
  mechanicName?: string | null;
}

export class Appointment {
  id?: number | null;
  customerId?: number | null;
  clientName: string;
  vehiclePlate: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  description?: string | null;
  followUpOf?: number | null;
  mechanicId?: number | null;
  mechanicName?: string | null;

  constructor({ id = null, customerId = null, clientName, vehiclePlate, scheduledAt, status = APPOINTMENT_STATUS.SCHEDULED, description = null, followUpOf = null, mechanicId = null, mechanicName = null }: AppointmentProps) {
    this.id = id;
    this.customerId = customerId;
    this.clientName = clientName;
    this.vehiclePlate = vehiclePlate;
    this.scheduledAt = scheduledAt instanceof Date ? scheduledAt : new Date(scheduledAt);
    this.status = status;
    this.description = description ?? null;
    this.followUpOf = followUpOf;
    this.mechanicId = mechanicId;
    this.mechanicName = mechanicName;
  }

  canBeCancelled(): boolean {
    return this.status === APPOINTMENT_STATUS.SCHEDULED;
  }

  isCompleted(): boolean {
    return this.status === APPOINTMENT_STATUS.COMPLETED;
  }
}

export default Appointment;
