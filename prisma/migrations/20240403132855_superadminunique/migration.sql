/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SuperAdmin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_name_key" ON "SuperAdmin"("name");
