import { Router } from 'express';
import CustomerController from '../features/customers/infrastructure/CustomerController';

const router = Router();

router.get('/', CustomerController.getCustomers);
router.post('/', CustomerController.createCustomer);
router.put('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);
router.post('/:id/vehicles', CustomerController.addVehicle);
router.delete('/:id/vehicles/:vehicleId', CustomerController.deleteVehicle);

export default router;
