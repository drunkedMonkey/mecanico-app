import { CustomerDTO } from '../../infrastructure/CustomerDTO';

export default class CreateCustomerCommand {
  static readonly TYPE = 'CreateCustomerCommand';
  readonly type = CreateCustomerCommand.TYPE;
  constructor(public readonly data: CustomerDTO) {}
}
