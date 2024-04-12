-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "sex" TEXT,
    "verified" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "ticketId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slot" JSONB NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "about" TEXT,
    "address" TEXT,
    "verified" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "membersLength" INTEGER NOT NULL DEFAULT 2,
    "slots" JSONB,
    "weekdays" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fcmToken" TEXT,

    CONSTRAINT "BusinessUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessUserId" TEXT,
    "password" TEXT NOT NULL,
    "fcmToken" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusinessUserToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_name_key" ON "SuperAdmin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE INDEX "User_mobile_name_idx" ON "User"("mobile", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_ticketId_key" ON "Appointments"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUser_mobile_key" ON "BusinessUser"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUser_email_key" ON "BusinessUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUser_slug_key" ON "BusinessUser"("slug");

-- CreateIndex
CREATE INDEX "BusinessUser_mobile_name_idx" ON "BusinessUser"("mobile", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Member_mobile_key" ON "Member"("mobile");

-- CreateIndex
CREATE INDEX "Member_mobile_name_idx" ON "Member"("mobile", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessUserToUser_AB_unique" ON "_BusinessUserToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessUserToUser_B_index" ON "_BusinessUserToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_businessUserId_fkey" FOREIGN KEY ("businessUserId") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_businessUserId_fkey" FOREIGN KEY ("businessUserId") REFERENCES "BusinessUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessUserToUser" ADD CONSTRAINT "_BusinessUserToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "BusinessUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessUserToUser" ADD CONSTRAINT "_BusinessUserToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
