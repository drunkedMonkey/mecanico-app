"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreEmployeeCommand = void 0;
class RestoreEmployeeCommand {
    constructor(id) {
        this.id = id;
        this.type = RestoreEmployeeCommand.TYPE;
    }
}
exports.RestoreEmployeeCommand = RestoreEmployeeCommand;
RestoreEmployeeCommand.TYPE = 'RestoreEmployeeCommand';
exports.default = RestoreEmployeeCommand;
