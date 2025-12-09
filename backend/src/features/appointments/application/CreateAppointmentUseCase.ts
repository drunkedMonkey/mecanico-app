export class CreateAppointmentUseCase {
  repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async execute(data: any) {
    if ((!data.client_name && !data.customerId) || !data.vehicle_plate || !data.scheduled_at) {
      throw new Error('Missing required fields');
    }

    return this.repository.create(data);
  }
}

export default CreateAppointmentUseCase;
