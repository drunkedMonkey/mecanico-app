const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");
  const hashedPassword = bcrypt.hashSync('123456', 10);

  // Limpiar base de datos (orden importante por claves foráneas)
  try {
    await prisma.appointment.deleteMany({});
    console.log("Citas eliminadas.");
    await prisma.employee.deleteMany({});
    console.log("Empleados eliminados.");
  } catch (error) {
    console.warn("Error al limpiar datos:", error.message);
  }

  // 1. Crear Empleados con la nueva estructura
  const mechanic1 = await prisma.employee.create({
    data: {
      name: 'Juan Pérez García',
      firstName: 'Juan',
      firstSurname: 'Pérez',
      secondSurname: 'García',
      dni: '12345678Z',
      email: 'juan.perez@taller.com',
      phone: '600123456',
      employeeCode: 'JPG12345678',
      role: 'MECHANIC',
      password: hashedPassword
    },
  });

  const mechanic2 = await prisma.employee.create({
    data: {
      name: 'Ana López Martín',
      firstName: 'Ana',
      firstSurname: 'López',
      secondSurname: 'Martín',
      dni: '87654321X',
      email: 'ana.lopez@taller.com',
      phone: '600987654',
      employeeCode: 'ALM87654321',
      role: 'MECHANIC',
      password: hashedPassword
    },
  });

  const admin1 = await prisma.employee.create({
    data: {
      name: 'Carlos Admin',
      firstName: 'Carlos',
      firstSurname: 'Admin',
      dni: '11111111H',
      email: 'admin@taller.com',
      phone: '600000000',
      employeeCode: 'CA11111111',
      role: 'ADMIN',
      password: hashedPassword
    },
  });

  const backoffice1 = await prisma.employee.create({
    data: {
      name: 'Laura Backoffice',
      firstName: 'Laura',
      firstSurname: 'Backoffice',
      dni: '22222222J',
      email: 'backoffice@taller.com',
      phone: '600000001',
      employeeCode: 'LB22222222',
      role: 'BACKOFFICE',
      password: hashedPassword
    },
  });

  // 2. Crear un Servicio por defecto (ID 1)
  const service = await prisma.service.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mantenimiento General',
      duration: 60, // minutos
    },
  });

  console.log("Seed ejecutado correctamente:", { mechanic1, mechanic2, service });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
