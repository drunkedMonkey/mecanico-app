"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmployeesUseCase = void 0;
class GetEmployeesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return this.repository.findAll();
    }
}
exports.GetEmployeesUseCase = GetEmployeesUseCase;
exports.default = GetEmployeesUseCase;
