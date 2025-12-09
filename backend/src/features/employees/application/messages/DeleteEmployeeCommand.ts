export class DeleteEmployeeCommand {
  static readonly TYPE = 'DeleteEmployeeCommand';
  readonly type = DeleteEmployeeCommand.TYPE;
  constructor(public id: string | number) {}
}

export default DeleteEmployeeCommand;
