export class RestoreEmployeeUseCase {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async execute(id: any) {
    return this.repository.restore(id);
  }
}

export default RestoreEmployeeUseCase;
