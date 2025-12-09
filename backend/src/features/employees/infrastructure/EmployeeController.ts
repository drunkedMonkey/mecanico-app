import bus from '../../../shared/bus/Bus';
import type { Request, Response } from 'express';
import GetEmployeesQuery from '../application/messages/GetEmployeesQuery';
import type { EmployeeDTO } from '../infrastructure/EmployeeDTO';
import CreateEmployeeCommand from '../application/messages/CreateEmployeeCommand';
import UpdateEmployeeCommand from '../application/messages/UpdateEmployeeCommand';
import DeleteEmployeeCommand from '../application/messages/DeleteEmployeeCommand';
import RestoreEmployeeCommand from '../application/messages/RestoreEmployeeCommand';
import PrismaEmployeeRepository from './PrismaEmployeeRepository';

// Note: composition / registration of handlers happens in server.ts (composition root)

class EmployeeController {
  async getEmployees(_req: Request, res: Response) {
    try {
      const employees = await bus.dispatch(new GetEmployeesQuery() as any);
      // Map domain Employee -> DTO
      const payload = employees.map((e: any) => ({ 
        id: e.id, 
        name: e.name,
        firstName: e.firstName,
        firstSurname: e.firstSurname,
        secondSurname: e.secondSurname,
        dni: e.dni,
        email: e.email,
        phone: e.phone,
        employeeCode: e.employeeCode,
        role: e.role,
        deletedAt: e.deletedAt
      } as EmployeeDTO));
      res.json(payload);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno' });
    }
  }

  async createEmployee(req: Request, res: Response) {
    try {
      const cmd = new CreateEmployeeCommand(req.body as any);
      const employee = await bus.dispatch(cmd as any);
      res.status(201).json(employee);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const cmd = new UpdateEmployeeCommand(req.params.id, req.body as any);
      const employee = await bus.dispatch(cmd as any);
      res.json(employee);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const cmd = new DeleteEmployeeCommand(Number(req.params.id));
      await bus.dispatch(cmd as any);
      res.status(204).send();
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async restoreEmployee(req: Request, res: Response) {
    try {
      const cmd = new RestoreEmployeeCommand(Number(req.params.id));
      await bus.dispatch(cmd as any);
      res.status(204).send();
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
}

export default new EmployeeController();
