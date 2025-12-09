import { Request, Response } from 'express';
import { LoginUseCase } from '../application/LoginUseCase';
import { ChangePasswordUseCase } from '../application/ChangePasswordUseCase';
import { PrismaEmployeeRepository } from '../../employees/infrastructure/PrismaEmployeeRepository';

const employeeRepository = new PrismaEmployeeRepository();
const loginUseCase = new LoginUseCase(employeeRepository);
const changePasswordUseCase = new ChangePasswordUseCase(employeeRepository);

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      const result = await loginUseCase.execute(email, password);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      res.status(401).json({ error: error.message || 'Error de autenticación' });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { userId, newPassword } = req.body;
      if (!userId || !newPassword) {
        return res.status(400).json({ error: 'User ID y nueva contraseña son requeridos' });
      }

      await changePasswordUseCase.execute(userId, newPassword);
      res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message || 'Error al cambiar la contraseña' });
    }
  }
}

export default new AuthController();
