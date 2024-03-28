/*
  Warnings:

  - Changed the type of `slot` on the `Appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "slot",
ADD COLUMN     "slot" JSONB NOT NULL;
