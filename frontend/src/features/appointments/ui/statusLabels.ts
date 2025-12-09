import { APPOINTMENT_STATUS } from '../domain/AppointmentStatus';

export const STATUS_LABELS: Record<string, string> = {
  [APPOINTMENT_STATUS.SCHEDULED]: 'Citada',
  [APPOINTMENT_STATUS.IN_PROGRESS]: 'En curso',
  [APPOINTMENT_STATUS.COMPLETED]: 'Completada',
  [APPOINTMENT_STATUS.CANCELLED]: 'Cancelada',
};

export const getStatusLabel = (status: string) => STATUS_LABELS[status] || status;
