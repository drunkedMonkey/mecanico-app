export class GetAppointmentsUseCase {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async execute(filters: any = {}) {
    return this.repository.findAll(filters);
  }
}

export default GetAppointmentsUseCase;
