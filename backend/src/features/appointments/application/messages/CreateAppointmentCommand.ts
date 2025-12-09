export interface CreateAppointmentPayload {
  customerId?: number;
  client_name?: string;
  vehicle_plate: string;
  scheduled_at: string | Date;
  description?: string | null;
  mechanic_id?: number;
}

export class CreateAppointmentCommand {
  static readonly TYPE = 'CreateAppointmentCommand';
  readonly type = CreateAppointmentCommand.TYPE;
  constructor(public payload: CreateAppointmentPayload) {}
}

export default CreateAppointmentCommand;
