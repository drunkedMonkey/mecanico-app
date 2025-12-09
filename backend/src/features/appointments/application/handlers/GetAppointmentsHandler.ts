import GetAppointmentsUseCase from '../GetAppointmentsUseCase';
import GetAppointmentsQuery from '../messages/GetAppointmentsQuery';

export default function makeGetAppointmentsHandler(repository: any) {
  const useCase = new GetAppointmentsUseCase(repository);
  return async (message: GetAppointmentsQuery) => {
    return useCase.execute(message.payload ?? {});
  };
}
