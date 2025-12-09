/*
  Warnings:

  - You are about to drop the `Mechanic` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MECHANIC', 'ADMIN', 'BACKOFFICE');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_mechanicId_fkey";

-- DropTable
DROP TABLE "Mechanic";

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT,
    "firstSurname" TEXT,
    "secondSurname" TEXT,
    "dni" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "employeeCode" TEXT,
    "role" "Role" NOT NULL DEFAULT 'MECHANIC',
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_dni_key" ON "Employee"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeCode_key" ON "Employee"("employeeCode");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_mechanicId_fkey" FOREIGN KEY ("mechanicId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
