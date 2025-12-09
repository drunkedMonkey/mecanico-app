"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.APPOINTMENT_STATUS = void 0;
exports.APPOINTMENT_STATUS = {
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};
class Appointment {
    constructor({ id = null, customerId = null, clientName, vehiclePlate, scheduledAt, status = exports.APPOINTMENT_STATUS.SCHEDULED, description = null, followUpOf = null, mechanicId = null, mechanicName = null }) {
        this.id = id;
        this.customerId = customerId;
        this.clientName = clientName;
        this.vehiclePlate = vehiclePlate;
        this.scheduledAt = scheduledAt instanceof Date ? scheduledAt : new Date(scheduledAt);
        this.status = status;
        this.description = description ?? null;
        this.followUpOf = followUpOf;
        this.mechanicId = mechanicId;
        this.mechanicName = mechanicName;
    }
    canBeCancelled() {
        return this.status === exports.APPOINTMENT_STATUS.SCHEDULED;
    }
    isCompleted() {
        return this.status === exports.APPOINTMENT_STATUS.COMPLETED;
    }
}
exports.Appointment = Appointment;
exports.default = Appointment;
