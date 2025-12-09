export class UpdateAppointmentCommand {
  static readonly TYPE = 'UpdateAppointmentCommand';
  readonly type = UpdateAppointmentCommand.TYPE;
  id: number | string;
  payload: any;

  constructor(id: number | string, payload: any) {
    this.id = id;
    this.payload = payload;
  }
}

export default UpdateAppointmentCommand;
