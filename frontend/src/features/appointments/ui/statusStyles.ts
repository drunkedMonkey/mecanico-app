import { APPOINTMENT_STATUS } from '../domain/AppointmentStatus';

export const STATUS_COLORS: Record<string, string> = {
  [APPOINTMENT_STATUS.SCHEDULED]: '#e3f2fd', // light blue
  [APPOINTMENT_STATUS.IN_PROGRESS]: '#fff3e0', // light orange
  [APPOINTMENT_STATUS.COMPLETED]: '#e8f5e9', // light green
  [APPOINTMENT_STATUS.CANCELLED]: '#ffebee', // light red
};

export const STATUS_BORDER: Record<string, string> = {
  [APPOINTMENT_STATUS.SCHEDULED]: '#90caf9',
  [APPOINTMENT_STATUS.IN_PROGRESS]: '#ffb74d',
  [APPOINTMENT_STATUS.COMPLETED]: '#81c784',
  [APPOINTMENT_STATUS.CANCELLED]: '#ef9a9a',
};

export const getStatusColor = (status: string) => STATUS_COLORS[status] || 'transparent';
export const getStatusBorder = (status: string) => STATUS_BORDER[status] || 'transparent';
