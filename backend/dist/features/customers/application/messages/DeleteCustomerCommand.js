"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteCustomerCommand {
    constructor(id) {
        this.id = id;
        this.type = DeleteCustomerCommand.TYPE;
    }
}
DeleteCustomerCommand.TYPE = 'DeleteCustomerCommand';
exports.default = DeleteCustomerCommand;
