"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeDeleteVehicleHandler;
function makeDeleteVehicleHandler(repository) {
    return async (message) => {
        return repository.deleteVehicle(message.vehicleId);
    };
}
