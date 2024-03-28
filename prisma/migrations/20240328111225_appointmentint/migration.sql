/*
  Warnings:

  - A unique constraint covering the columns `[ticketId]` on the table `Appointments` will be added. If there are existing duplicate values, this will fail.
  - Made the column `memberId` on table `Appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_memberId_fkey";

-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "ticketId" SERIAL NOT NULL,
ALTER COLUMN "memberId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_ticketId_key" ON "Appointments"("ticketId");

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
