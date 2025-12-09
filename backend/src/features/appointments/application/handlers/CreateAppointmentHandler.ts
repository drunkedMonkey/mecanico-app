import CreateAppointmentUseCase from '../CreateAppointmentUseCase';
import CreateAppointmentCommand from '../messages/CreateAppointmentCommand';

export default function makeCreateAppointmentHandler(repository: any) {
  const useCase = new CreateAppointmentUseCase(repository);
  return async (message: CreateAppointmentCommand) => {
    return useCase.execute(message.payload);
  };
}
