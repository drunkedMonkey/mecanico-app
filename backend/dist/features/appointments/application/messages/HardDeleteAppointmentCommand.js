"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HardDeleteAppointmentCommand {
    constructor(id) {
        this.type = HardDeleteAppointmentCommand.TYPE;
        this.id = id;
    }
}
HardDeleteAppointmentCommand.TYPE = 'HardDeleteAppointmentCommand';
exports.default = HardDeleteAppointmentCommand;
