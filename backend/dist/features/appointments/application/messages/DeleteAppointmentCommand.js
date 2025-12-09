"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppointmentCommand = void 0;
class DeleteAppointmentCommand {
    constructor(id) {
        this.type = DeleteAppointmentCommand.TYPE;
        this.id = id;
    }
}
exports.DeleteAppointmentCommand = DeleteAppointmentCommand;
DeleteAppointmentCommand.TYPE = 'DeleteAppointmentCommand';
exports.default = DeleteAppointmentCommand;
