"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVehicleCommand = void 0;
class AddVehicleCommand {
    constructor(customerId, payload) {
        this.customerId = customerId;
        this.payload = payload;
        this.type = AddVehicleCommand.TYPE;
    }
}
exports.AddVehicleCommand = AddVehicleCommand;
AddVehicleCommand.TYPE = 'AddVehicleCommand';
exports.default = AddVehicleCommand;
