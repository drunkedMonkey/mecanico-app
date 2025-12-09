"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentUseCase = void 0;
class CreateAppointmentUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        if ((!data.client_name && !data.customerId) || !data.vehicle_plate || !data.scheduled_at) {
            throw new Error('Missing required fields');
        }
        return this.repository.create(data);
    }
}
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
exports.default = CreateAppointmentUseCase;
