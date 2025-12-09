export interface CreateEmployeePayload {
  name: string;
  firstName?: string;
  firstSurname?: string;
  secondSurname?: string;
  dni?: string;
  email?: string;
  phone?: string;
}

export class CreateEmployeeCommand {
  static readonly TYPE = 'CreateEmployeeCommand';
  readonly type = CreateEmployeeCommand.TYPE;
  constructor(public payload: CreateEmployeePayload) {}
}

export default CreateEmployeeCommand;
