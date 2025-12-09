export class GetAppointmentByIdQuery {
  static readonly TYPE = 'GetAppointmentByIdQuery';
  readonly type = GetAppointmentByIdQuery.TYPE;
  id: number | string;

  constructor(id: number | string) {
    this.id = id;
  }
}

export default GetAppointmentByIdQuery;
