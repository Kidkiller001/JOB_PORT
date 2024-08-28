/*
  Warnings:

  - You are about to drop the `Postulation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Postulation" DROP CONSTRAINT "Postulation_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Postulation" DROP CONSTRAINT "Postulation_employerId_fkey";

-- DropForeignKey
ALTER TABLE "Postulation" DROP CONSTRAINT "Postulation_jobId_fkey";

-- DropForeignKey
ALTER TABLE "_PostulationToUser" DROP CONSTRAINT "_PostulationToUser_A_fkey";

-- DropTable
DROP TABLE "Postulation";

-- CreateTable
CREATE TABLE "postulation" (
    "id" SERIAL NOT NULL,
    "employerId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "postulation_employerId_employeeId_jobId_key" ON "postulation"("employerId", "employeeId", "jobId");

-- AddForeignKey
ALTER TABLE "postulation" ADD CONSTRAINT "postulation_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulation" ADD CONSTRAINT "postulation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulation" ADD CONSTRAINT "postulation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostulationToUser" ADD CONSTRAINT "_PostulationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "postulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
