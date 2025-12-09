"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEmployeeCommand = void 0;
class DeleteEmployeeCommand {
    constructor(id) {
        this.id = id;
        this.type = DeleteEmployeeCommand.TYPE;
    }
}
exports.DeleteEmployeeCommand = DeleteEmployeeCommand;
DeleteEmployeeCommand.TYPE = 'DeleteEmployeeCommand';
exports.default = DeleteEmployeeCommand;
