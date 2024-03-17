/*
  Warnings:

  - Added the required column `businessName` to the `BusinessUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessUser" ADD COLUMN     "businessName" TEXT NOT NULL;
