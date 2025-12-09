import RestoreEmployeeUseCase from '../RestoreEmployeeUseCase';
import RestoreEmployeeCommand from '../messages/RestoreEmployeeCommand';

export default function makeRestoreEmployeeHandler(repository: any) {
  const useCase = new RestoreEmployeeUseCase(repository);
  return async (message: RestoreEmployeeCommand) => {
    return useCase.execute(message.id);
  };
}
