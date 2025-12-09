import { Router, Request, Response } from 'express';
import appointmentController from '../features/appointments/infrastructure/AppointmentController';

const router = Router();

// GET /api/appointments
// GET /api/appointments (supports query filters: q, status, mechanicId, dateFrom, dateTo)
router.get('/', (req: Request, res: Response) => appointmentController.getAppointments(req, res));

// POST /api/appointments
router.post('/', (req: Request, res: Response) => appointmentController.createAppointment(req, res));

// GET /api/appointments/:id
router.get('/:id', (req: Request, res: Response) => appointmentController.getAppointmentById(req, res));

// PUT /api/appointments/:id
router.put('/:id', (req: Request, res: Response) => appointmentController.updateAppointment(req, res));

// DELETE /api/appointments/:id
router.delete('/:id', (req: Request, res: Response) => appointmentController.deleteAppointment(req, res));

export default router;
