import GetAppointmentByIdQuery from '../messages/GetAppointmentByIdQuery';

export default function makeGetAppointmentByIdHandler(repository: any) {
  return async (message: GetAppointmentByIdQuery) => {
    const appointment = await repository.findById(message.id);
    return appointment;
  };
}
