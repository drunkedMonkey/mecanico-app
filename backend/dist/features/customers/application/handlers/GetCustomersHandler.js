"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeGetCustomersHandler;
function makeGetCustomersHandler(repository) {
    return async function handle(_query) {
        return repository.findAll();
    };
}
