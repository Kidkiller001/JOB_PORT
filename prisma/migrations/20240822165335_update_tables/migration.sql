/*
  Warnings:

  - Added the required column `employer_id` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job" ADD COLUMN     "employer_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
