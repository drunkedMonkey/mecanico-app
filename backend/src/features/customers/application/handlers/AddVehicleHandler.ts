import AddVehicleCommand from '../messages/AddVehicleCommand';
import CustomerRepository from '../../domain/CustomerRepository';

export default function makeAddVehicleHandler(repository: CustomerRepository) {
  return async (message: AddVehicleCommand) => {
    return repository.addVehicle(message.customerId, message.payload);
  };
}
