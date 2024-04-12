/*
  Warnings:

  - Added the required column `fcmToken` to the `BusinessUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fcmToken` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessUser" ADD COLUMN     "fcmToken" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "fcmToken" TEXT NOT NULL;
