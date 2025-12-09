export interface CreateAppointmentDTO {
  client_name: string;
  vehicle_plate: string;
  scheduled_at: string; // ISO datetime
  description?: string | null;
}

export interface AppointmentDTO {
  id?: number;
  customer_id?: number | null;
  client_name: string;
  vehicle_plate: string;
  scheduled_at: string; // ISO datetime
  status: string;
  description?: string | null;
  mechanic_id?: number | null;
  mechanic_name?: string | null;
}

export default AppointmentDTO;
