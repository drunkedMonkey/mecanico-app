export default class DeleteCustomerCommand {
  static readonly TYPE = 'DeleteCustomerCommand';
  readonly type = DeleteCustomerCommand.TYPE;
  constructor(public readonly id: number | string) {}
}
