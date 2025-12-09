"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentsQuery = void 0;
class GetAppointmentsQuery {
    constructor(payload = {}) {
        this.type = GetAppointmentsQuery.TYPE;
        this.payload = payload;
    }
}
exports.GetAppointmentsQuery = GetAppointmentsQuery;
GetAppointmentsQuery.TYPE = 'GetAppointmentsQuery';
exports.default = GetAppointmentsQuery;
