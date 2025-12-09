"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeGetAppointmentByIdHandler;
function makeGetAppointmentByIdHandler(repository) {
    return async (message) => {
        const appointment = await repository.findById(message.id);
        return appointment;
    };
}
