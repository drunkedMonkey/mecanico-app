export class DeleteEmployeeUseCase {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async execute(id: any) {
    return this.repository.softDelete(id);
  }
}

export default DeleteEmployeeUseCase;
