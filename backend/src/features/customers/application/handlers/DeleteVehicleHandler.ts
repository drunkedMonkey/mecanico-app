import DeleteVehicleCommand from '../messages/DeleteVehicleCommand';
import CustomerRepository from '../../domain/CustomerRepository';

export default function makeDeleteVehicleHandler(repository: CustomerRepository) {
  return async (message: DeleteVehicleCommand) => {
    return repository.deleteVehicle(message.vehicleId);
  };
}
