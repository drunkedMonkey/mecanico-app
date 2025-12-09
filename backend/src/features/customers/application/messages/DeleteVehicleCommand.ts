export class DeleteVehicleCommand {
  static readonly TYPE = 'DeleteVehicleCommand';
  readonly type = DeleteVehicleCommand.TYPE;
  constructor(public vehicleId: number) {}
}

export default DeleteVehicleCommand;
