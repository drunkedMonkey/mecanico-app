"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeCommand = void 0;
class UpdateEmployeeCommand {
    constructor(id, payload) {
        this.id = id;
        this.payload = payload;
        this.type = UpdateEmployeeCommand.TYPE;
    }
}
exports.UpdateEmployeeCommand = UpdateEmployeeCommand;
UpdateEmployeeCommand.TYPE = 'UpdateEmployeeCommand';
exports.default = UpdateEmployeeCommand;
