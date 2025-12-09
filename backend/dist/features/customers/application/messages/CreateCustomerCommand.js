"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCustomerCommand {
    constructor(data) {
        this.data = data;
        this.type = CreateCustomerCommand.TYPE;
    }
}
CreateCustomerCommand.TYPE = 'CreateCustomerCommand';
exports.default = CreateCustomerCommand;
