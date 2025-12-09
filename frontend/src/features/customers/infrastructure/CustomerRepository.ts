import type { Customer, Vehicle } from "../domain/Customer";
import type { CreateCustomerDTO, UpdateCustomerDTO, AddVehicleDTO } from "./CustomerDTO";

export class CustomerRepository {
  private readonly baseUrl = 'http://localhost:8000/api/customers';

  async getCustomers(): Promise<Customer[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }
    return response.json();
  }

  async createCustomer(data: CreateCustomerDTO): Promise<Customer> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al crear el cliente');
    }
    return response.json();
  }

  async updateCustomer(id: number, data: UpdateCustomerDTO): Promise<Customer> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al actualizar el cliente');
    }
    return response.json();
  }

  async deleteCustomer(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al eliminar el cliente');
    }
  }

  async addVehicle(customerId: number, data: AddVehicleDTO): Promise<Vehicle> {
    const response = await fetch(`${this.baseUrl}/${customerId}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al añadir el vehículo');
    }
    return response.json();
  }

  async deleteVehicle(customerId: number, vehicleId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${customerId}/vehicles/${vehicleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al eliminar el vehículo');
    }
  }
}
