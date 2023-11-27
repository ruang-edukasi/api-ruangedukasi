-- AlterTable
ALTER TABLE "course" ADD COLUMN     "adminId" INTEGER;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
