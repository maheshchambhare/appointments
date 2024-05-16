/*
  Warnings:

  - You are about to drop the column `durationFemale` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `durationMale` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `priceFemale` on the `Package` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "durationFemale",
DROP COLUMN "durationMale",
DROP COLUMN "priceFemale",
ADD COLUMN     "duration" JSONB NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
