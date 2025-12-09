"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const LoginUseCase_1 = require("../application/LoginUseCase");
const ChangePasswordUseCase_1 = require("../application/ChangePasswordUseCase");
const PrismaEmployeeRepository_1 = require("../../employees/infrastructure/PrismaEmployeeRepository");
const employeeRepository = new PrismaEmployeeRepository_1.PrismaEmployeeRepository();
const loginUseCase = new LoginUseCase_1.LoginUseCase(employeeRepository);
const changePasswordUseCase = new ChangePasswordUseCase_1.ChangePasswordUseCase(employeeRepository);
class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email y contraseña son requeridos' });
            }
            const result = await loginUseCase.execute(email, password);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ error: error.message || 'Error de autenticación' });
        }
    }
    async changePassword(req, res) {
        try {
            const { userId, newPassword } = req.body;
            if (!userId || !newPassword) {
                return res.status(400).json({ error: 'User ID y nueva contraseña son requeridos' });
            }
            await changePasswordUseCase.execute(userId, newPassword);
            res.json({ message: 'Contraseña actualizada correctamente' });
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message || 'Error al cambiar la contraseña' });
        }
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
