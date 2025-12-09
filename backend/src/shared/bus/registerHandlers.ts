import bus from './Bus';
import PrismaAppointmentRepository from '../../features/appointments/infrastructure/PrismaAppointmentRepository';
import makeGetAppointmentsHandler from '../../features/appointments/application/handlers/GetAppointmentsHandler';
import makeCreateAppointmentHandler from '../../features/appointments/application/handlers/CreateAppointmentHandler';
import makeGetAppointmentByIdHandler from '../../features/appointments/application/handlers/GetAppointmentByIdHandler';
import makeUpdateAppointmentHandler from '../../features/appointments/application/handlers/UpdateAppointmentHandler';
import makeDeleteAppointmentHandler from '../../features/appointments/application/handlers/DeleteAppointmentHandler';
import GetAppointmentsQuery from '../../features/appointments/application/messages/GetAppointmentsQuery';
import CreateAppointmentCommand from '../../features/appointments/application/messages/CreateAppointmentCommand';
import GetAppointmentByIdQuery from '../../features/appointments/application/messages/GetAppointmentByIdQuery';
import UpdateAppointmentCommand from '../../features/appointments/application/messages/UpdateAppointmentCommand';
import DeleteAppointmentCommand from '../../features/appointments/application/messages/DeleteAppointmentCommand';
import HardDeleteAppointmentCommand from '../../features/appointments/application/messages/HardDeleteAppointmentCommand';
import makeHardDeleteAppointmentHandler from '../../features/appointments/application/handlers/HardDeleteAppointmentHandler';

import { PrismaCustomerRepository } from '../../features/customers/infrastructure/PrismaCustomerRepository';
import makeGetCustomersHandler from '../../features/customers/application/handlers/GetCustomersHandler';
import makeCreateCustomerHandler from '../../features/customers/application/handlers/CreateCustomerHandler';
import makeUpdateCustomerHandler from '../../features/customers/application/handlers/UpdateCustomerHandler';
import makeDeleteCustomerHandler from '../../features/customers/application/handlers/DeleteCustomerHandler';
import makeAddVehicleHandler from '../../features/customers/application/handlers/AddVehicleHandler';
import makeDeleteVehicleHandler from '../../features/customers/application/handlers/DeleteVehicleHandler';
import GetCustomersQuery from '../../features/customers/application/messages/GetCustomersQuery';
import CreateCustomerCommand from '../../features/customers/application/messages/CreateCustomerCommand';
import UpdateCustomerCommand from '../../features/customers/application/messages/UpdateCustomerCommand';
import DeleteCustomerCommand from '../../features/customers/application/messages/DeleteCustomerCommand';
import AddVehicleCommand from '../../features/customers/application/messages/AddVehicleCommand';
import DeleteVehicleCommand from '../../features/customers/application/messages/DeleteVehicleCommand';

// Repos
const appointmentRepo = new PrismaAppointmentRepository();
const customerRepo = new PrismaCustomerRepository();

// Appointment Handlers
const getAppointmentsHandler = makeGetAppointmentsHandler(appointmentRepo);
const createAppointmentHandler = makeCreateAppointmentHandler(appointmentRepo);
const getAppointmentByIdHandler = makeGetAppointmentByIdHandler(appointmentRepo);
const updateAppointmentHandler = makeUpdateAppointmentHandler(appointmentRepo);
const deleteAppointmentHandler = makeDeleteAppointmentHandler(appointmentRepo);
const hardDeleteAppointmentHandler = makeHardDeleteAppointmentHandler(appointmentRepo);

// Customer Handlers
const getCustomersHandler = makeGetCustomersHandler(customerRepo);
const createCustomerHandler = makeCreateCustomerHandler(customerRepo);
const updateCustomerHandler = makeUpdateCustomerHandler(customerRepo);
const deleteCustomerHandler = makeDeleteCustomerHandler(customerRepo);
const addVehicleHandler = makeAddVehicleHandler(customerRepo);
const deleteVehicleHandler = makeDeleteVehicleHandler(customerRepo);

// Register Appointments
bus.register(GetAppointmentsQuery.TYPE, getAppointmentsHandler as any);
bus.register(CreateAppointmentCommand.TYPE, createAppointmentHandler as any);
bus.register(GetAppointmentByIdQuery.TYPE, getAppointmentByIdHandler as any);
bus.register(UpdateAppointmentCommand.TYPE, updateAppointmentHandler as any);
bus.register(DeleteAppointmentCommand.TYPE, deleteAppointmentHandler as any);
bus.register(HardDeleteAppointmentCommand.TYPE, hardDeleteAppointmentHandler as any);

// Register Customers
bus.register(GetCustomersQuery.TYPE, getCustomersHandler as any);
bus.register(CreateCustomerCommand.TYPE, createCustomerHandler as any);
bus.register(UpdateCustomerCommand.TYPE, updateCustomerHandler as any);
bus.register(DeleteCustomerCommand.TYPE, deleteCustomerHandler as any);
bus.register(AddVehicleCommand.TYPE, addVehicleHandler as any);
bus.register(DeleteVehicleCommand.TYPE, deleteVehicleHandler as any);

export default bus;
