/*
  Warnings:

  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_businessUserId_fkey";

-- DropTable
DROP TABLE "Package";

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessUserId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "duration" JSONB NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Services_id_key" ON "Services"("id");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_businessUserId_fkey" FOREIGN KEY ("businessUserId") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
