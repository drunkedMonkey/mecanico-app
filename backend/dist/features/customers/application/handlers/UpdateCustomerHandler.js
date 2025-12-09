"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeUpdateCustomerHandler;
function makeUpdateCustomerHandler(repository) {
    return async function handle(command) {
        return repository.update(command.id, command.data);
    };
}
