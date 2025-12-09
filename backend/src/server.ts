import 'dotenv/config';
import app from './app';

// Composition root: crear repos, handlers y registrar en el bus
import bus from './shared/bus/Bus';

import PrismaAppointmentRepository from './features/appointments/infrastructure/PrismaAppointmentRepository';
import makeGetAppointmentsHandler from './features/appointments/application/handlers/GetAppointmentsHandler';
import makeCreateAppointmentHandler from './features/appointments/application/handlers/CreateAppointmentHandler';
import GetAppointmentsQuery from './features/appointments/application/messages/GetAppointmentsQuery';
import CreateAppointmentCommand from './features/appointments/application/messages/CreateAppointmentCommand';
import makeGetAppointmentByIdHandler from './features/appointments/application/handlers/GetAppointmentByIdHandler';
import makeUpdateAppointmentHandler from './features/appointments/application/handlers/UpdateAppointmentHandler';
import makeDeleteAppointmentHandler from './features/appointments/application/handlers/DeleteAppointmentHandler';
import GetAppointmentByIdQuery from './features/appointments/application/messages/GetAppointmentByIdQuery';
import UpdateAppointmentCommand from './features/appointments/application/messages/UpdateAppointmentCommand';
import DeleteAppointmentCommand from './features/appointments/application/messages/DeleteAppointmentCommand';

import PrismaEmployeeRepository from './features/employees/infrastructure/PrismaEmployeeRepository';
import makeGetEmployeesHandler from './features/employees/application/handlers/GetEmployeesHandler';
import makeCreateEmployeeHandler from './features/employees/application/handlers/CreateEmployeeHandler';
import makeUpdateEmployeeHandler from './features/employees/application/handlers/UpdateEmployeeHandler';
import makeDeleteEmployeeHandler from './features/employees/application/handlers/DeleteEmployeeHandler';
import makeRestoreEmployeeHandler from './features/employees/application/handlers/RestoreEmployeeHandler';
import GetEmployeesQuery from './features/employees/application/messages/GetEmployeesQuery';
import CreateEmployeeCommand from './features/employees/application/messages/CreateEmployeeCommand';
import UpdateEmployeeCommand from './features/employees/application/messages/UpdateEmployeeCommand';
import DeleteEmployeeCommand from './features/employees/application/messages/DeleteEmployeeCommand';
import RestoreEmployeeCommand from './features/employees/application/messages/RestoreEmployeeCommand';

import PrismaCustomerRepository from './features/customers/infrastructure/PrismaCustomerRepository';
import makeGetCustomersHandler from './features/customers/application/handlers/GetCustomersHandler';
import makeCreateCustomerHandler from './features/customers/application/handlers/CreateCustomerHandler';
import makeUpdateCustomerHandler from './features/customers/application/handlers/UpdateCustomerHandler';
import makeDeleteCustomerHandler from './features/customers/application/handlers/DeleteCustomerHandler';
import GetCustomersQuery from './features/customers/application/messages/GetCustomersQuery';
import CreateCustomerCommand from './features/customers/application/messages/CreateCustomerCommand';
import UpdateCustomerCommand from './features/customers/application/messages/UpdateCustomerCommand';
import DeleteCustomerCommand from './features/customers/application/messages/DeleteCustomerCommand';

// Repositories
const appointmentRepo = new PrismaAppointmentRepository();
const employeeRepo = new PrismaEmployeeRepository();
const customerRepo = new PrismaCustomerRepository();

// Handlers
const getAppointmentsHandler = makeGetAppointmentsHandler(appointmentRepo);
const createAppointmentHandler = makeCreateAppointmentHandler(appointmentRepo);
const getAppointmentByIdHandler = makeGetAppointmentByIdHandler(appointmentRepo);
const updateAppointmentHandler = makeUpdateAppointmentHandler(appointmentRepo);
const deleteAppointmentHandler = makeDeleteAppointmentHandler(appointmentRepo);

const getEmployeesHandler = makeGetEmployeesHandler(employeeRepo);
const createEmployeeHandler = makeCreateEmployeeHandler(employeeRepo);
const updateEmployeeHandler = makeUpdateEmployeeHandler(employeeRepo);
const deleteEmployeeHandler = makeDeleteEmployeeHandler(employeeRepo);
const restoreEmployeeHandler = makeRestoreEmployeeHandler(employeeRepo);

const getCustomersHandler = makeGetCustomersHandler(customerRepo);
const createCustomerHandler = makeCreateCustomerHandler(customerRepo);
const updateCustomerHandler = makeUpdateCustomerHandler(customerRepo);
const deleteCustomerHandler = makeDeleteCustomerHandler(customerRepo);

// Register handlers on the bus
bus.register(GetAppointmentsQuery.TYPE, getAppointmentsHandler as any);
bus.register(CreateAppointmentCommand.TYPE, createAppointmentHandler as any);
bus.register(GetAppointmentByIdQuery.TYPE, getAppointmentByIdHandler as any);
bus.register(UpdateAppointmentCommand.TYPE, updateAppointmentHandler as any);
bus.register(DeleteAppointmentCommand.TYPE, deleteAppointmentHandler as any);

bus.register(GetEmployeesQuery.TYPE, getEmployeesHandler as any);
bus.register(CreateEmployeeCommand.TYPE, createEmployeeHandler as any);
bus.register(UpdateEmployeeCommand.TYPE, updateEmployeeHandler as any);
bus.register(DeleteEmployeeCommand.TYPE, deleteEmployeeHandler as any);
bus.register(RestoreEmployeeCommand.TYPE, restoreEmployeeHandler as any);

bus.register(GetCustomersQuery.TYPE, getCustomersHandler as any);
bus.register(CreateCustomerCommand.TYPE, createCustomerHandler as any);
bus.register(UpdateCustomerCommand.TYPE, updateCustomerHandler as any);
bus.register(DeleteCustomerCommand.TYPE, deleteCustomerHandler as any);

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
