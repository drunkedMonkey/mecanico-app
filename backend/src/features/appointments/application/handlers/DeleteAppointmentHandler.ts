import DeleteAppointmentCommand from '../messages/DeleteAppointmentCommand';

export default function makeDeleteAppointmentHandler(repository: any) {
  return async (message: DeleteAppointmentCommand) => {
    const deleted = await repository.softDelete(message.id);
    return deleted;
  };
}
