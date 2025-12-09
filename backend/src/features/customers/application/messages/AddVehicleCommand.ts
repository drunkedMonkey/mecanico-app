export class AddVehicleCommand {
  static readonly TYPE = 'AddVehicleCommand';
  readonly type = AddVehicleCommand.TYPE;
  constructor(public customerId: number, public payload: { brand: string; model: string; plate: string }) {}
}

export default AddVehicleCommand;
