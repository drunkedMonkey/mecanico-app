import UpdateCustomerCommand from '../messages/UpdateCustomerCommand';
import CustomerRepository from '../../domain/CustomerRepository';

export default function makeUpdateCustomerHandler(repository: CustomerRepository) {
  return async function handle(command: UpdateCustomerCommand) {
    return repository.update(command.id, command.data);
  };
}
