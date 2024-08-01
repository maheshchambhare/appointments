/*
  Warnings:

  - You are about to drop the column `facabook` on the `Website` table. All the data in the column will be lost.
  - Made the column `businessUserId` on table `Website` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_businessUserId_fkey";

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "facabook",
ADD COLUMN     "facebook" TEXT,
ALTER COLUMN "businessUserId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_businessUserId_fkey" FOREIGN KEY ("businessUserId") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
