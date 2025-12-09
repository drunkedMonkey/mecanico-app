"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentsUseCase = void 0;
class GetAppointmentsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(filters = {}) {
        return this.repository.findAll(filters);
    }
}
exports.GetAppointmentsUseCase = GetAppointmentsUseCase;
exports.default = GetAppointmentsUseCase;
