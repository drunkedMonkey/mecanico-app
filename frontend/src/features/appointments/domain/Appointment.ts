import { APPOINTMENT_STATUS } from './AppointmentStatus';
import type { AppointmentStatus } from './AppointmentStatus';

export class Appointment {
  constructor(
    public readonly id: number,
    public readonly customerId: number | null,
    public readonly clientName: string,
    public readonly vehiclePlate: string,
    public readonly scheduledAt: Date,
    public readonly status: AppointmentStatus,
    public readonly description?: string,
    public readonly mechanicId?: number | null,
    public readonly mechanicName?: string | null,
  ) {}

  public canBeCancelled(): boolean {
    return this.status === APPOINTMENT_STATUS.SCHEDULED;
  }

  public isCompleted(): boolean {
    if (this.status === APPOINTMENT_STATUS.COMPLETED) return true;
    if (this.status === APPOINTMENT_STATUS.CANCELLED) return false;
    // If the scheduled date is in the past, consider it completed
    try {
      return this.scheduledAt.getTime() <= new Date().getTime();
    } catch (e) {
      return false;
    }
  }
}

