"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class CreateEmployeeUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        if (!data.name)
            throw new Error('Name is required');
        const hashedPassword = await bcryptjs_1.default.hash('123456', 10);
        return this.repository.create({
            ...data,
            password: hashedPassword,
            passwordChanged: false
        });
    }
}
exports.CreateEmployeeUseCase = CreateEmployeeUseCase;
exports.default = CreateEmployeeUseCase;
