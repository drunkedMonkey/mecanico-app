"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeCreateCustomerHandler;
function makeCreateCustomerHandler(repository) {
    return async function handle(command) {
        return repository.create(command.data);
    };
}
