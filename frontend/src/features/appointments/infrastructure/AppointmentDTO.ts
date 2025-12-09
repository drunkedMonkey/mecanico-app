export interface AppointmentDTO {
  id: number;
  customer_id?: number | null;
  client_name: string;
  vehicle_plate: string;
  scheduled_at: string; // ISO Date string
  status: string;
  description?: string;
  mechanic_id?: number | null;
  mechanic_name?: string | null;
}
