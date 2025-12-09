"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeHardDeleteAppointmentHandler;
function makeHardDeleteAppointmentHandler(repository) {
    return async (message) => {
        await repository.hardDelete(message.id);
        return { success: true };
    };
}
