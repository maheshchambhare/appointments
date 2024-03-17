/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BusinessUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `BusinessUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessUser" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUser_slug_key" ON "BusinessUser"("slug");
