"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ChangePasswordUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(userId, newPassword) {
        if (!newPassword || newPassword.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await this.repository.update(userId, {
            password: hashedPassword,
            passwordChanged: true
        });
    }
}
exports.ChangePasswordUseCase = ChangePasswordUseCase;
