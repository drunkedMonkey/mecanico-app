export interface UpdateEmployeePayload {
  name: string;
  firstName?: string;
  firstSurname?: string;
  secondSurname?: string;
  dni?: string;
  email?: string;
  phone?: string;
}

export class UpdateEmployeeCommand {
  static readonly TYPE = 'UpdateEmployeeCommand';
  readonly type = UpdateEmployeeCommand.TYPE;
  constructor(public id: string | number, public payload: UpdateEmployeePayload) {}
}

export default UpdateEmployeeCommand;
