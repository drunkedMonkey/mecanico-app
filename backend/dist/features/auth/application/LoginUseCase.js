"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(email, password) {
        const user = await this.repository.findByEmail(email);
        if (!user || !user.password) {
            throw new Error('Credenciales inválidas');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }
        if (user.deletedAt) {
            throw new Error('Usuario desactivado');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                passwordChanged: user.passwordChanged
            },
        };
    }
}
exports.LoginUseCase = LoginUseCase;
