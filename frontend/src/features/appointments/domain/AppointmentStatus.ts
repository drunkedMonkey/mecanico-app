export type AppointmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
