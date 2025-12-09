export class DeleteAppointmentCommand {
  static readonly TYPE = 'DeleteAppointmentCommand';
  readonly type = DeleteAppointmentCommand.TYPE;
  id: number | string;

  constructor(id: number | string) {
    this.id = id;
  }
}

export default DeleteAppointmentCommand;
