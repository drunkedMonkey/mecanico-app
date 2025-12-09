import type { Appointment } from "../domain/Appointment";
import type { AppointmentDTO } from "./AppointmentDTO";
import { AppointmentMapper } from "./AppointmentMapper";

export class AppointmentRepository {
  private readonly baseUrl = 'http://localhost:8000/api/appointments';

  async getAppointments(): Promise<Appointment[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }
    const dtos: AppointmentDTO[] = await response.json();
    return dtos.map((dto) => AppointmentMapper.toDomain(dto));
  }

  async createAppointment(data: { customerId?: number; client_name?: string; vehicle_plate: string; scheduled_at: string; description?: string; mechanic_id?: number | string }): Promise<Appointment> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al crear la cita');
    }

    const dto: AppointmentDTO = await response.json();
    return AppointmentMapper.toDomain(dto);
  }

  async deleteAppointment(id: number | string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al cancelar la cita');
    }
  }

  async deleteAppointmentPermanently(id: number | string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}?permanent=true`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la cita permanentemente');
    }
  }

  async updateAppointment(id: number | string, data: Partial<{ client_name: string; vehicle_plate: string; scheduled_at: string; description?: string; status?: string; mechanic_id?: number | string }>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la cita');
    }
  }
}
