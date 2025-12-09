"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreEmployeeUseCase = void 0;
class RestoreEmployeeUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        return this.repository.restore(id);
    }
}
exports.RestoreEmployeeUseCase = RestoreEmployeeUseCase;
exports.default = RestoreEmployeeUseCase;
