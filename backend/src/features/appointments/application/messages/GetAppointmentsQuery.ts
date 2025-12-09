export type GetAppointmentsQueryPayload = {
  q?: string;
  status?: string;
  mechanicId?: number | string;
  dateFrom?: string;
  dateTo?: string;
};

export class GetAppointmentsQuery {
  static readonly TYPE = 'GetAppointmentsQuery';
  readonly type = GetAppointmentsQuery.TYPE;
  payload: GetAppointmentsQueryPayload;

  constructor(payload: GetAppointmentsQueryPayload = {}) {
    this.payload = payload;
  }
}

export default GetAppointmentsQuery;
