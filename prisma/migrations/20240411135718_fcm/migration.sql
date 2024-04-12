-- AlterTable
ALTER TABLE "BusinessUser" ALTER COLUMN "fcmToken" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "fcmToken" DROP NOT NULL;
