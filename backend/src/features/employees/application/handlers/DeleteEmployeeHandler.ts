import DeleteEmployeeUseCase from '../DeleteEmployeeUseCase';
import DeleteEmployeeCommand from '../messages/DeleteEmployeeCommand';

export default function makeDeleteEmployeeHandler(repository: any) {
  const useCase = new DeleteEmployeeUseCase(repository);
  return async (message: DeleteEmployeeCommand) => {
    return useCase.execute(message.id);
  };
}
