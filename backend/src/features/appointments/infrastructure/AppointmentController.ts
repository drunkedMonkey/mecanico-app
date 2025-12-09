import bus from '../../../shared/bus/registerHandlers';
import AppointmentMapper from './AppointmentMapper';
import type { Request, Response } from 'express';
import GetAppointmentsQuery from '../application/messages/GetAppointmentsQuery';
import CreateAppointmentCommand from '../application/messages/CreateAppointmentCommand';
import GetAppointmentByIdQuery from '../application/messages/GetAppointmentByIdQuery';
import UpdateAppointmentCommand from '../application/messages/UpdateAppointmentCommand';
import DeleteAppointmentCommand from '../application/messages/DeleteAppointmentCommand';
import HardDeleteAppointmentCommand from '../application/messages/HardDeleteAppointmentCommand';

class AppointmentController {
  async getAppointments(_req: Request, res: Response) {
    try {
      // allow filters via query params
      const payload = {
        q: _req.query.q as string | undefined,
        status: _req.query.status as string | undefined,
        mechanicId: _req.query.mechanicId as string | undefined,
        dateFrom: _req.query.dateFrom as string | undefined,
        dateTo: _req.query.dateTo as string | undefined,
      };

      const domainAppointments = await bus.dispatch(new GetAppointmentsQuery(payload) as any);
      const dtos = domainAppointments.map((a: any) => AppointmentMapper.toDTO(a));
      res.json(dtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async createAppointment(req: Request, res: Response) {
    try {
      const cmd = new CreateAppointmentCommand(req.body);
      const domainAppointment = await bus.dispatch(cmd as any);
      const dto = AppointmentMapper.toDTO(domainAppointment);
      res.status(201).json(dto);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Missing required fields') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al crear la cita' });
      }
    }
  }

  async getAppointmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const domainAppointment = await bus.dispatch(new GetAppointmentByIdQuery(id) as any);
      if (!domainAppointment) return res.status(404).json({ error: 'Cita no encontrada' });
      const dto = AppointmentMapper.toDTO(domainAppointment);
      res.json(dto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async updateAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cmd = new UpdateAppointmentCommand(id, req.body);
      const domainAppointment = await bus.dispatch(cmd as any);
      const dto = AppointmentMapper.toDTO(domainAppointment);
      res.json(dto);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la cita' });
    }
  }

  async deleteAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const permanent = req.query.permanent === 'true';
      
      if (permanent) {
        const cmd = new HardDeleteAppointmentCommand(id);
        await bus.dispatch(cmd as any);
        res.status(204).send();
      } else {
        const cmd = new DeleteAppointmentCommand(id);
        const domainAppointment = await bus.dispatch(cmd as any);
        const dto = AppointmentMapper.toDTO(domainAppointment);
        res.json(dto);
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la cita' });
    }
  }
}

export default new AppointmentController();
