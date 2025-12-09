"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeCommand = void 0;
class CreateEmployeeCommand {
    constructor(payload) {
        this.payload = payload;
        this.type = CreateEmployeeCommand.TYPE;
    }
}
exports.CreateEmployeeCommand = CreateEmployeeCommand;
CreateEmployeeCommand.TYPE = 'CreateEmployeeCommand';
exports.default = CreateEmployeeCommand;
