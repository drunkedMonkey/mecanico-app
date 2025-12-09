"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerHandlers_1 = __importDefault(require("../../../shared/bus/registerHandlers"));
const AppointmentMapper_1 = __importDefault(require("./AppointmentMapper"));
const GetAppointmentsQuery_1 = __importDefault(require("../application/messages/GetAppointmentsQuery"));
const CreateAppointmentCommand_1 = __importDefault(require("../application/messages/CreateAppointmentCommand"));
const GetAppointmentByIdQuery_1 = __importDefault(require("../application/messages/GetAppointmentByIdQuery"));
const UpdateAppointmentCommand_1 = __importDefault(require("../application/messages/UpdateAppointmentCommand"));
const DeleteAppointmentCommand_1 = __importDefault(require("../application/messages/DeleteAppointmentCommand"));
const HardDeleteAppointmentCommand_1 = __importDefault(require("../application/messages/HardDeleteAppointmentCommand"));
class AppointmentController {
    async getAppointments(_req, res) {
        try {
            // allow filters via query params
            const payload = {
                q: _req.query.q,
                status: _req.query.status,
                mechanicId: _req.query.mechanicId,
                dateFrom: _req.query.dateFrom,
                dateTo: _req.query.dateTo,
            };
            const domainAppointments = await registerHandlers_1.default.dispatch(new GetAppointmentsQuery_1.default(payload));
            const dtos = domainAppointments.map((a) => AppointmentMapper_1.default.toDTO(a));
            res.json(dtos);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    async createAppointment(req, res) {
        try {
            const cmd = new CreateAppointmentCommand_1.default(req.body);
            const domainAppointment = await registerHandlers_1.default.dispatch(cmd);
            const dto = AppointmentMapper_1.default.toDTO(domainAppointment);
            res.status(201).json(dto);
        }
        catch (error) {
            console.error(error);
            if (error.message === 'Missing required fields') {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Error al crear la cita' });
            }
        }
    }
    async getAppointmentById(req, res) {
        try {
            const { id } = req.params;
            const domainAppointment = await registerHandlers_1.default.dispatch(new GetAppointmentByIdQuery_1.default(id));
            if (!domainAppointment)
                return res.status(404).json({ error: 'Cita no encontrada' });
            const dto = AppointmentMapper_1.default.toDTO(domainAppointment);
            res.json(dto);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    async updateAppointment(req, res) {
        try {
            const { id } = req.params;
            const cmd = new UpdateAppointmentCommand_1.default(id, req.body);
            const domainAppointment = await registerHandlers_1.default.dispatch(cmd);
            const dto = AppointmentMapper_1.default.toDTO(domainAppointment);
            res.json(dto);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar la cita' });
        }
    }
    async deleteAppointment(req, res) {
        try {
            const { id } = req.params;
            const permanent = req.query.permanent === 'true';
            if (permanent) {
                const cmd = new HardDeleteAppointmentCommand_1.default(id);
                await registerHandlers_1.default.dispatch(cmd);
                res.status(204).send();
            }
            else {
                const cmd = new DeleteAppointmentCommand_1.default(id);
                const domainAppointment = await registerHandlers_1.default.dispatch(cmd);
                const dto = AppointmentMapper_1.default.toDTO(domainAppointment);
                res.json(dto);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la cita' });
        }
    }
}
exports.default = new AppointmentController();
