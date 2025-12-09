"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bus_1 = __importDefault(require("../../../shared/bus/Bus"));
const GetEmployeesQuery_1 = __importDefault(require("../application/messages/GetEmployeesQuery"));
const CreateEmployeeCommand_1 = __importDefault(require("../application/messages/CreateEmployeeCommand"));
const UpdateEmployeeCommand_1 = __importDefault(require("../application/messages/UpdateEmployeeCommand"));
const DeleteEmployeeCommand_1 = __importDefault(require("../application/messages/DeleteEmployeeCommand"));
const RestoreEmployeeCommand_1 = __importDefault(require("../application/messages/RestoreEmployeeCommand"));
// Note: composition / registration of handlers happens in server.ts (composition root)
class EmployeeController {
    async getEmployees(_req, res) {
        try {
            const employees = await Bus_1.default.dispatch(new GetEmployeesQuery_1.default());
            // Map domain Employee -> DTO
            const payload = employees.map((e) => ({
                id: e.id,
                name: e.name,
                firstName: e.firstName,
                firstSurname: e.firstSurname,
                secondSurname: e.secondSurname,
                dni: e.dni,
                email: e.email,
                phone: e.phone,
                employeeCode: e.employeeCode,
                role: e.role,
                deletedAt: e.deletedAt
            }));
            res.json(payload);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno' });
        }
    }
    async createEmployee(req, res) {
        try {
            const cmd = new CreateEmployeeCommand_1.default(req.body);
            const employee = await Bus_1.default.dispatch(cmd);
            res.status(201).json(employee);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    async updateEmployee(req, res) {
        try {
            const cmd = new UpdateEmployeeCommand_1.default(req.params.id, req.body);
            const employee = await Bus_1.default.dispatch(cmd);
            res.json(employee);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    async deleteEmployee(req, res) {
        try {
            const cmd = new DeleteEmployeeCommand_1.default(Number(req.params.id));
            await Bus_1.default.dispatch(cmd);
            res.status(204).send();
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    async restoreEmployee(req, res) {
        try {
            const cmd = new RestoreEmployeeCommand_1.default(Number(req.params.id));
            await Bus_1.default.dispatch(cmd);
            res.status(204).send();
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new EmployeeController();
