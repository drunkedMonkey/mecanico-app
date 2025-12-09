import CreateEmployeeUseCase from '../CreateEmployeeUseCase';
import CreateEmployeeCommand from '../messages/CreateEmployeeCommand';

export default function makeCreateEmployeeHandler(repository: any) {
  const useCase = new CreateEmployeeUseCase(repository);
  return async (message: CreateEmployeeCommand) => {
    return useCase.execute(message.payload);
  };
}
