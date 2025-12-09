"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteVehicleCommand = void 0;
class DeleteVehicleCommand {
    constructor(vehicleId) {
        this.vehicleId = vehicleId;
        this.type = DeleteVehicleCommand.TYPE;
    }
}
exports.DeleteVehicleCommand = DeleteVehicleCommand;
DeleteVehicleCommand.TYPE = 'DeleteVehicleCommand';
exports.default = DeleteVehicleCommand;
