"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeDeleteCustomerHandler;
function makeDeleteCustomerHandler(repository) {
    return async function handle(command) {
        return repository.delete(command.id);
    };
}
