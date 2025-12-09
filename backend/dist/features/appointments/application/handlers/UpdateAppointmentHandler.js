"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeUpdateAppointmentHandler;
function makeUpdateAppointmentHandler(repository) {
    return async (message) => {
        const updated = await repository.update(message.id, message.payload);
        return updated;
    };
}
