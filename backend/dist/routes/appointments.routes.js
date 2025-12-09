"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppointmentController_1 = __importDefault(require("../features/appointments/infrastructure/AppointmentController"));
const router = (0, express_1.Router)();
// GET /api/appointments
// GET /api/appointments (supports query filters: q, status, mechanicId, dateFrom, dateTo)
router.get('/', (req, res) => AppointmentController_1.default.getAppointments(req, res));
// POST /api/appointments
router.post('/', (req, res) => AppointmentController_1.default.createAppointment(req, res));
// GET /api/appointments/:id
router.get('/:id', (req, res) => AppointmentController_1.default.getAppointmentById(req, res));
// PUT /api/appointments/:id
router.put('/:id', (req, res) => AppointmentController_1.default.updateAppointment(req, res));
// DELETE /api/appointments/:id
router.delete('/:id', (req, res) => AppointmentController_1.default.deleteAppointment(req, res));
exports.default = router;
