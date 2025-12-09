"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateCustomerCommand {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.type = UpdateCustomerCommand.TYPE;
    }
}
UpdateCustomerCommand.TYPE = 'UpdateCustomerCommand';
exports.default = UpdateCustomerCommand;
