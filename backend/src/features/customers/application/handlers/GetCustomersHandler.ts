import GetCustomersQuery from '../messages/GetCustomersQuery';
import CustomerRepository from '../../domain/CustomerRepository';

export default function makeGetCustomersHandler(repository: CustomerRepository) {
  return async function handle(_query: GetCustomersQuery) {
    return repository.findAll();
  };
}
