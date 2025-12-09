"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEmployeeUseCase = void 0;
class DeleteEmployeeUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        return this.repository.softDelete(id);
    }
}
exports.DeleteEmployeeUseCase = DeleteEmployeeUseCase;
exports.default = DeleteEmployeeUseCase;
