/*
  Warnings:

  - Added the required column `avatar` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "avatar" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
