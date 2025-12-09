import GetEmployeesUseCase from '../GetEmployeesUseCase';
import GetEmployeesQuery from '../messages/GetEmployeesQuery';

export default function makeGetEmployeesHandler(repository: any) {
  const useCase = new GetEmployeesUseCase(repository);
  return async (message: GetEmployeesQuery) => {
    return useCase.execute();
  };
}
