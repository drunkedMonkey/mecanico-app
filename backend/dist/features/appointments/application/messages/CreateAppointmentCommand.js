"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentCommand = void 0;
class CreateAppointmentCommand {
    constructor(payload) {
        this.payload = payload;
        this.type = CreateAppointmentCommand.TYPE;
    }
}
exports.CreateAppointmentCommand = CreateAppointmentCommand;
CreateAppointmentCommand.TYPE = 'CreateAppointmentCommand';
exports.default = CreateAppointmentCommand;
