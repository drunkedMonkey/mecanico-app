/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `Mechanic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeCode]` on the table `Mechanic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "followUpOf" INTEGER;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "address" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "firstSurname" TEXT,
ADD COLUMN     "identifier" TEXT,
ADD COLUMN     "identifierType" TEXT,
ADD COLUMN     "secondSurname" TEXT;

-- AlterTable
ALTER TABLE "Mechanic" ADD COLUMN     "dni" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "employeeCode" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "firstSurname" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "secondSurname" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_identifier_key" ON "Customer"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_dni_key" ON "Mechanic"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_employeeCode_key" ON "Mechanic"("employeeCode");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_followUpOf_fkey" FOREIGN KEY ("followUpOf") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
