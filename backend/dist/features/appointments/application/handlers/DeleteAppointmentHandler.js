"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeDeleteAppointmentHandler;
function makeDeleteAppointmentHandler(repository) {
    return async (message) => {
        const deleted = await repository.softDelete(message.id);
        return deleted;
    };
}
