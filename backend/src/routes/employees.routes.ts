import { Router, Request, Response } from 'express';
import employeeController from '../features/employees/infrastructure/EmployeeController';

const router = Router();

// GET /api/employees
router.get('/', (req: Request, res: Response) => employeeController.getEmployees(req, res));

// POST /api/employees
router.post('/', (req: Request, res: Response) => employeeController.createEmployee(req, res));

// PUT /api/employees/:id
router.put('/:id', (req: Request, res: Response) => employeeController.updateEmployee(req, res));

// DELETE /api/employees/:id (soft delete)
router.delete('/:id', (req: Request, res: Response) => employeeController.deleteEmployee(req, res));

// PATCH /api/employees/:id/restore
router.patch('/:id/restore', (req: Request, res: Response) => employeeController.restoreEmployee(req, res));

export default router;
