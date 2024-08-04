/*
  Warnings:

  - A unique constraint covering the columns `[businessUserId]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Website` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Website" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Website_businessUserId_key" ON "Website"("businessUserId");
