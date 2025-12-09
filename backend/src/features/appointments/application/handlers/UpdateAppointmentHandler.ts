import UpdateAppointmentCommand from '../messages/UpdateAppointmentCommand';

export default function makeUpdateAppointmentHandler(repository: any) {
  return async (message: UpdateAppointmentCommand) => {
    const updated = await repository.update(message.id, message.payload);
    return updated;
  };
}
