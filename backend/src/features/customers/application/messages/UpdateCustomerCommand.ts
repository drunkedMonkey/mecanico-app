import { CustomerDTO } from '../../infrastructure/CustomerDTO';

export default class UpdateCustomerCommand {
  static readonly TYPE = 'UpdateCustomerCommand';
  readonly type = UpdateCustomerCommand.TYPE;
  constructor(public readonly id: number | string, public readonly data: CustomerDTO) {}
}
