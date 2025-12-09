"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeUseCase = void 0;
class UpdateEmployeeUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        if (!data.name)
            throw new Error('Name is required');
        return this.repository.update(id, data);
    }
}
exports.UpdateEmployeeUseCase = UpdateEmployeeUseCase;
exports.default = UpdateEmployeeUseCase;
