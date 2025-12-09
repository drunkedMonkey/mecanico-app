import UpdateEmployeeUseCase from '../UpdateEmployeeUseCase';
import UpdateEmployeeCommand from '../messages/UpdateEmployeeCommand';

export default function makeUpdateEmployeeHandler(repository: any) {
  const useCase = new UpdateEmployeeUseCase(repository);
  return async (message: UpdateEmployeeCommand) => {
    return useCase.execute(message.id, message.payload);
  };
}
