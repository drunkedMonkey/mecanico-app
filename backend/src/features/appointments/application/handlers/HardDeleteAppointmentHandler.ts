import HardDeleteAppointmentCommand from '../messages/HardDeleteAppointmentCommand';

export default function makeHardDeleteAppointmentHandler(repository: any) {
  return async (message: HardDeleteAppointmentCommand) => {
    await repository.hardDelete(message.id);
    return { success: true };
  };
}
