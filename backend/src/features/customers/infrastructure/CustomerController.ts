import bus from '../../../shared/bus/registerHandlers';
import type { Request, Response } from 'express';
import GetCustomersQuery from '../application/messages/GetCustomersQuery';
import type { CustomerDTO } from './CustomerDTO';
import CreateCustomerCommand from '../application/messages/CreateCustomerCommand';
import UpdateCustomerCommand from '../application/messages/UpdateCustomerCommand';
import DeleteCustomerCommand from '../application/messages/DeleteCustomerCommand';
import AddVehicleCommand from '../application/messages/AddVehicleCommand';
import DeleteVehicleCommand from '../application/messages/DeleteVehicleCommand';

class CustomerController {
  async getCustomers(_req: Request, res: Response) {
    try {
      const customers = await bus.dispatch(new GetCustomersQuery() as any);
      const payload = customers.map((c: any) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        vehicles: c.vehicles
      } as CustomerDTO));
      res.json(payload);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno' });
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const cmd = new CreateCustomerCommand(req.body as any);
      const customer = await bus.dispatch(cmd as any);
      res.status(201).json(customer);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async updateCustomer(req: Request, res: Response) {
    try {
      const cmd = new UpdateCustomerCommand(req.params.id, req.body as any);
      const customer = await bus.dispatch(cmd as any);
      res.json(customer);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    try {
      const cmd = new DeleteCustomerCommand(Number(req.params.id));
      await bus.dispatch(cmd as any);
      res.status(204).send();
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async addVehicle(req: Request, res: Response) {
    try {
      const customerId = Number(req.params.id);
      const cmd = new AddVehicleCommand(customerId, req.body);
      const vehicle = await bus.dispatch(cmd as any);
      res.status(201).json(vehicle);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  async deleteVehicle(req: Request, res: Response) {
    try {
      const vehicleId = Number(req.params.vehicleId);
      const cmd = new DeleteVehicleCommand(vehicleId);
      await bus.dispatch(cmd as any);
      res.status(204).send();
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
}

export default new CustomerController();
