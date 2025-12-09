"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeAddVehicleHandler;
function makeAddVehicleHandler(repository) {
    return async (message) => {
        return repository.addVehicle(message.customerId, message.payload);
    };
}
