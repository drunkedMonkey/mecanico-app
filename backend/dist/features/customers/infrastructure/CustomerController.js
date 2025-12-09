"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerHandlers_1 = __importDefault(require("../../../shared/bus/registerHandlers"));
const GetCustomersQuery_1 = __importDefault(require("../application/messages/GetCustomersQuery"));
const CreateCustomerCommand_1 = __importDefault(require("../application/messages/CreateCustomerCommand"));
const UpdateCustomerCommand_1 = __importDefault(require("../application/messages/UpdateCustomerCommand"));
const DeleteCustomerCommand_1 = __importDefault(require("../application/messages/DeleteCustomerCommand"));
const AddVehicleCommand_1 = __importDefault(require("../application/messages/AddVehicleCommand"));
const DeleteVehicleCommand_1 = __importDefault(require("../application/messages/DeleteVehicleCommand"));
class CustomerController {
    async getCustomers(_req, res) {
        try {
            const customers = await registerHandlers_1.default.dispatch(new GetCustomersQuery_1.default());
            const payload = customers.map((c) => ({
                id: c.id,
                name: c.name,
                email: c.email,
                phone: c.phone,
                vehicles: c.vehicles
            }));
            res.json(payload);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno' });
        }
    }
    async createCustomer(req, res) {
        try {
            const cmd = new CreateCustomerCommand_1.default(req.body);
            const customer = await registerHandlers_1.default.dispatch(cmd);
            res.status(201).json(customer);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    async updateCustomer(req, res) {
        try {
            const cmd = new UpdateCustomerCommand_1.default(req.params.id, req.body);
            const customer = await registerHandlers_1.default.dispatch(cmd);
            res.json(customer);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    async deleteCustomer(req, res) {
        try {
            const cmd = new DeleteCustomerCommand_1.default(Number(req.params.id));
            await registerHandlers_1.default.dispatch(cmd);
            res.status(204).send();
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    async addVehicle(req, res) {
        try {
            const customerId = Number(req.params.id);
            const cmd = new AddVehicleCommand_1.default(customerId, req.body);
            const vehicle = await registerHandlers_1.default.dispatch(cmd);
            res.status(201).json(vehicle);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    async deleteVehicle(req, res) {
        try {
            const vehicleId = Number(req.params.vehicleId);
            const cmd = new DeleteVehicleCommand_1.default(vehicleId);
            await registerHandlers_1.default.dispatch(cmd);
            res.status(204).send();
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new CustomerController();
