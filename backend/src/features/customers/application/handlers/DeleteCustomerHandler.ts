import DeleteCustomerCommand from '../messages/DeleteCustomerCommand';
import CustomerRepository from '../../domain/CustomerRepository';

export default function makeDeleteCustomerHandler(repository: CustomerRepository) {
  return async function handle(command: DeleteCustomerCommand) {
    return repository.delete(command.id);
  };
}
