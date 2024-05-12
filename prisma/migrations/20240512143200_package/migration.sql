/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `BusinessUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BusinessUser" ADD COLUMN     "breakTimeEnd" TEXT,
ADD COLUMN     "breakTimeStart" TEXT,
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "startTime" TEXT,
ADD COLUMN     "type" TEXT;

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessUserId" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "durationMale" JSONB NOT NULL,
    "durationFemale" JSONB NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_id_key" ON "Package"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUser_id_key" ON "BusinessUser"("id");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_businessUserId_fkey" FOREIGN KEY ("businessUserId") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
