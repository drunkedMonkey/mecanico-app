import CreateCustomerCommand from '../messages/CreateCustomerCommand';
import CustomerRepository from '../../domain/CustomerRepository';

export default function makeCreateCustomerHandler(repository: CustomerRepository) {
  return async function handle(command: CreateCustomerCommand) {
    return repository.create(command.data);
  };
}
