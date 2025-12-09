"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bus_1 = __importDefault(require("./Bus"));
const PrismaAppointmentRepository_1 = __importDefault(require("../../features/appointments/infrastructure/PrismaAppointmentRepository"));
const GetAppointmentsHandler_1 = __importDefault(require("../../features/appointments/application/handlers/GetAppointmentsHandler"));
const CreateAppointmentHandler_1 = __importDefault(require("../../features/appointments/application/handlers/CreateAppointmentHandler"));
const GetAppointmentByIdHandler_1 = __importDefault(require("../../features/appointments/application/handlers/GetAppointmentByIdHandler"));
const UpdateAppointmentHandler_1 = __importDefault(require("../../features/appointments/application/handlers/UpdateAppointmentHandler"));
const DeleteAppointmentHandler_1 = __importDefault(require("../../features/appointments/application/handlers/DeleteAppointmentHandler"));
const GetAppointmentsQuery_1 = __importDefault(require("../../features/appointments/application/messages/GetAppointmentsQuery"));
const CreateAppointmentCommand_1 = __importDefault(require("../../features/appointments/application/messages/CreateAppointmentCommand"));
const GetAppointmentByIdQuery_1 = __importDefault(require("../../features/appointments/application/messages/GetAppointmentByIdQuery"));
const UpdateAppointmentCommand_1 = __importDefault(require("../../features/appointments/application/messages/UpdateAppointmentCommand"));
const DeleteAppointmentCommand_1 = __importDefault(require("../../features/appointments/application/messages/DeleteAppointmentCommand"));
const HardDeleteAppointmentCommand_1 = __importDefault(require("../../features/appointments/application/messages/HardDeleteAppointmentCommand"));
const HardDeleteAppointmentHandler_1 = __importDefault(require("../../features/appointments/application/handlers/HardDeleteAppointmentHandler"));
const PrismaCustomerRepository_1 = require("../../features/customers/infrastructure/PrismaCustomerRepository");
const GetCustomersHandler_1 = __importDefault(require("../../features/customers/application/handlers/GetCustomersHandler"));
const CreateCustomerHandler_1 = __importDefault(require("../../features/customers/application/handlers/CreateCustomerHandler"));
const UpdateCustomerHandler_1 = __importDefault(require("../../features/customers/application/handlers/UpdateCustomerHandler"));
const DeleteCustomerHandler_1 = __importDefault(require("../../features/customers/application/handlers/DeleteCustomerHandler"));
const AddVehicleHandler_1 = __importDefault(require("../../features/customers/application/handlers/AddVehicleHandler"));
const DeleteVehicleHandler_1 = __importDefault(require("../../features/customers/application/handlers/DeleteVehicleHandler"));
const GetCustomersQuery_1 = __importDefault(require("../../features/customers/application/messages/GetCustomersQuery"));
const CreateCustomerCommand_1 = __importDefault(require("../../features/customers/application/messages/CreateCustomerCommand"));
const UpdateCustomerCommand_1 = __importDefault(require("../../features/customers/application/messages/UpdateCustomerCommand"));
const DeleteCustomerCommand_1 = __importDefault(require("../../features/customers/application/messages/DeleteCustomerCommand"));
const AddVehicleCommand_1 = __importDefault(require("../../features/customers/application/messages/AddVehicleCommand"));
const DeleteVehicleCommand_1 = __importDefault(require("../../features/customers/application/messages/DeleteVehicleCommand"));
// Repos
const appointmentRepo = new PrismaAppointmentRepository_1.default();
const customerRepo = new PrismaCustomerRepository_1.PrismaCustomerRepository();
// Appointment Handlers
const getAppointmentsHandler = (0, GetAppointmentsHandler_1.default)(appointmentRepo);
const createAppointmentHandler = (0, CreateAppointmentHandler_1.default)(appointmentRepo);
const getAppointmentByIdHandler = (0, GetAppointmentByIdHandler_1.default)(appointmentRepo);
const updateAppointmentHandler = (0, UpdateAppointmentHandler_1.default)(appointmentRepo);
const deleteAppointmentHandler = (0, DeleteAppointmentHandler_1.default)(appointmentRepo);
const hardDeleteAppointmentHandler = (0, HardDeleteAppointmentHandler_1.default)(appointmentRepo);
// Customer Handlers
const getCustomersHandler = (0, GetCustomersHandler_1.default)(customerRepo);
const createCustomerHandler = (0, CreateCustomerHandler_1.default)(customerRepo);
const updateCustomerHandler = (0, UpdateCustomerHandler_1.default)(customerRepo);
const deleteCustomerHandler = (0, DeleteCustomerHandler_1.default)(customerRepo);
const addVehicleHandler = (0, AddVehicleHandler_1.default)(customerRepo);
const deleteVehicleHandler = (0, DeleteVehicleHandler_1.default)(customerRepo);
// Register Appointments
Bus_1.default.register(GetAppointmentsQuery_1.default.TYPE, getAppointmentsHandler);
Bus_1.default.register(CreateAppointmentCommand_1.default.TYPE, createAppointmentHandler);
Bus_1.default.register(GetAppointmentByIdQuery_1.default.TYPE, getAppointmentByIdHandler);
Bus_1.default.register(UpdateAppointmentCommand_1.default.TYPE, updateAppointmentHandler);
Bus_1.default.register(DeleteAppointmentCommand_1.default.TYPE, deleteAppointmentHandler);
Bus_1.default.register(HardDeleteAppointmentCommand_1.default.TYPE, hardDeleteAppointmentHandler);
// Register Customers
Bus_1.default.register(GetCustomersQuery_1.default.TYPE, getCustomersHandler);
Bus_1.default.register(CreateCustomerCommand_1.default.TYPE, createCustomerHandler);
Bus_1.default.register(UpdateCustomerCommand_1.default.TYPE, updateCustomerHandler);
Bus_1.default.register(DeleteCustomerCommand_1.default.TYPE, deleteCustomerHandler);
Bus_1.default.register(AddVehicleCommand_1.default.TYPE, addVehicleHandler);
Bus_1.default.register(DeleteVehicleCommand_1.default.TYPE, deleteVehicleHandler);
exports.default = Bus_1.default;
