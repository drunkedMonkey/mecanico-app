import { Router } from 'express';
import authController from '../features/auth/infrastructure/AuthController';

const router = Router();

router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);

export default router;
