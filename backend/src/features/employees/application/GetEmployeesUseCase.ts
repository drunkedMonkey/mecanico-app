export class GetEmployeesUseCase {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.findAll();
  }
}

export default GetEmployeesUseCase;
