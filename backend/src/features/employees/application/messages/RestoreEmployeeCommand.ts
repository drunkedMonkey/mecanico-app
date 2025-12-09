export class RestoreEmployeeCommand {
  static readonly TYPE = 'RestoreEmployeeCommand';
  readonly type = RestoreEmployeeCommand.TYPE;

  constructor(public readonly id: number) {}
}

export default RestoreEmployeeCommand;
