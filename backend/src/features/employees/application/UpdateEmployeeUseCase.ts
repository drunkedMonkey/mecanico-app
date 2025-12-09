export class UpdateEmployeeUseCase {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async execute(id: any, data: any) {
    if (!data.name) throw new Error('Name is required');
    return this.repository.update(id, data);
  }
}

export default UpdateEmployeeUseCase;
