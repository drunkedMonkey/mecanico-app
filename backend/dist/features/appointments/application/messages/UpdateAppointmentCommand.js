"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentCommand = void 0;
class UpdateAppointmentCommand {
    constructor(id, payload) {
        this.type = UpdateAppointmentCommand.TYPE;
        this.id = id;
        this.payload = payload;
    }
}
exports.UpdateAppointmentCommand = UpdateAppointmentCommand;
UpdateAppointmentCommand.TYPE = 'UpdateAppointmentCommand';
exports.default = UpdateAppointmentCommand;
