/*
  Warnings:

  - The `country` column on the `Website` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Website" DROP COLUMN "country",
ADD COLUMN     "country" JSONB;
