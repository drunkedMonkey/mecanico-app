import type { Employee } from "../domain/Employee";
import type { CreateEmployeeDTO, UpdateEmployeeDTO } from "./EmployeeDTO";

export class EmployeeRepository {
  private readonly baseUrl = 'http://localhost:8000/api/employees';

  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }
    const employees: Employee[] = await response.json();
    return employees;
  }

  async createEmployee(data: CreateEmployeeDTO): Promise<Employee> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al crear el empleado');
    }

    const employee: Employee = await response.json();
    return employee;
  }

  async updateEmployee(id: number, data: UpdateEmployeeDTO): Promise<Employee> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al actualizar el empleado');
    }

    const employee: Employee = await response.json();
    return employee;
  }

  async deleteEmployee(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al eliminar el empleado');
    }
  }

  async restoreEmployee(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}/restore`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al restaurar el empleado');
    }
  }
}
