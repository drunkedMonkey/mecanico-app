export default class HardDeleteAppointmentCommand {
  static readonly TYPE = 'HardDeleteAppointmentCommand';
  readonly type = HardDeleteAppointmentCommand.TYPE;
  id: number | string;

  constructor(id: number | string) {
    this.id = id;
  }
}
