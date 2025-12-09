"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentByIdQuery = void 0;
class GetAppointmentByIdQuery {
    constructor(id) {
        this.type = GetAppointmentByIdQuery.TYPE;
        this.id = id;
    }
}
exports.GetAppointmentByIdQuery = GetAppointmentByIdQuery;
GetAppointmentByIdQuery.TYPE = 'GetAppointmentByIdQuery';
exports.default = GetAppointmentByIdQuery;
