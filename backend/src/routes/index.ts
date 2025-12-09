import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import employeesRoutes from './employees.routes';
import customersRoutes from './customers.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/employees', employeesRoutes);
router.use('/customers', customersRoutes);
router.use('/auth', authRoutes);

export default router;
