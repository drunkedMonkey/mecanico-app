import EmployeeRepository from '../domain/EmployeeRepository';
import { PrismaClient } from '@prisma/client';
import Employee from '../domain/Employee';

const prisma = new PrismaClient();

function generateEmployeeCode(firstName: string, firstSurname: string, secondSurname: string, dni: string): string {
  const initials = (
    (firstName[0] || '') +
    (firstSurname[0] || '') +
    (secondSurname[0] || '')
  ).toUpperCase();
  
  // Extract numbers from DNI
  const dniNumbers = dni.replace(/\D/g, '');
  
  return `${initials}${dniNumbers}`;
}

export class PrismaEmployeeRepository extends EmployeeRepository {
  async findAll() {
    const employees = await prisma.employee.findMany({
      orderBy: { id: 'asc' }
    });

    return employees.map(m => new Employee({ 
      id: m.id, 
      name: m.name,
      firstName: m.firstName,
      firstSurname: m.firstSurname,
      secondSurname: m.secondSurname,
      dni: m.dni,
      email: m.email,
      phone: m.phone,
      employeeCode: m.employeeCode,
      role: m.role,
      passwordChanged: m.passwordChanged,
      deletedAt: m.deletedAt
    }));
  }

  async create(data: any) {
    const { name, firstName, firstSurname, secondSurname, dni, email, phone, role, password, passwordChanged } = data;
    
    let employeeCode = null;
    if (firstName && firstSurname && dni) {
      employeeCode = generateEmployeeCode(firstName, firstSurname, secondSurname || '', dni);
    }

    try {
      const emp = await prisma.employee.create({ 
        data: { 
          name,
          firstName,
          firstSurname,
          secondSurname,
          dni,
          email,
          phone,
          employeeCode,
          password,
          passwordChanged,
          role: role || 'MECHANIC'
        } 
      });
      return new Employee({ 
        id: emp.id,
        name: emp.name,
        firstName: emp.firstName,
        firstSurname: emp.firstSurname,
        secondSurname: emp.secondSurname,
        dni: emp.dni,
        email: emp.email,
        phone: emp.phone,
        employeeCode: emp.employeeCode,
        role: emp.role,
        passwordChanged: emp.passwordChanged,
        deletedAt: emp.deletedAt
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        if (Array.isArray(target) && target.includes('dni')) {
          throw new Error('Ya existe un empleado con ese DNI/NIE');
        }
        if (Array.isArray(target) && target.includes('email')) {
          throw new Error('Ya existe un empleado con ese Email');
        }
        if (Array.isArray(target) && target.includes('employeeCode')) {
          throw new Error('Error al generar el código de empleado (duplicado)');
        }
      }
      throw error;
    }
  }

  async update(id: any, data: any) {
    const { name, firstName, firstSurname, secondSurname, dni, email, phone, role, password, passwordChanged } = data;

    try {
      const emp = await prisma.employee.update({ 
        where: { id: Number(id) }, 
        data: { 
          name,
          firstName,
          firstSurname,
          secondSurname,
          dni,
          email,
          phone,
          role,
          password,
          passwordChanged
        } 
      });
      return new Employee({ 
        id: emp.id,
        name: emp.name,
        firstName: emp.firstName,
        firstSurname: emp.firstSurname,
        secondSurname: emp.secondSurname,
        dni: emp.dni,
        email: emp.email,
        phone: emp.phone,
        employeeCode: emp.employeeCode,
        role: emp.role,
        deletedAt: emp.deletedAt
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        if (Array.isArray(target) && target.includes('dni')) {
          throw new Error('Ya existe un empleado con ese DNI/NIE');
        }
        if (Array.isArray(target) && target.includes('email')) {
          throw new Error('Ya existe un empleado con ese Email');
        }
      }
      throw error;
    }
  }

  async softDelete(id: any) {
    const mechanicId = Number(id);

    // Check for active appointments assigned to this mechanic
    const activeAppointmentsCount = await prisma.appointment.count({
      where: {
        mechanicId: mechanicId,
        status: { in: ['scheduled', 'in_progress'] }
      }
    });

    if (activeAppointmentsCount > 0) {
      // Find a substitute mechanic
      const substitute = await prisma.employee.findFirst({
        where: {
          deletedAt: null,
          id: { not: mechanicId },
          role: 'MECHANIC'
        }
      });

      if (!substitute) {
        throw new Error('No se puede eliminar el mecánico porque tiene citas asignadas y no hay otro mecánico disponible para reasignarlas.');
      }

      // Reassign appointments
      await prisma.appointment.updateMany({
        where: {
          mechanicId: mechanicId,
          status: { in: ['scheduled', 'in_progress'] }
        },
        data: {
          mechanicId: substitute.id
        }
      });
    }

    await prisma.employee.update({
      where: { id: mechanicId },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: any) {
    await prisma.employee.update({
      where: { id: Number(id) },
      data: { deletedAt: null }
    });
  }

  async findByEmail(email: string) {
    const emp = await prisma.employee.findUnique({
      where: { email }
    });

    if (!emp) return null;

    return new Employee({ 
      id: emp.id,
      name: emp.name,
      firstName: emp.firstName,
      firstSurname: emp.firstSurname,
      secondSurname: emp.secondSurname,
      dni: emp.dni,
      email: emp.email,
      phone: emp.phone,
      employeeCode: emp.employeeCode,
      role: emp.role,
      password: emp.password,
      passwordChanged: emp.passwordChanged,
      deletedAt: emp.deletedAt
    });
  }
}

export default PrismaEmployeeRepository;
