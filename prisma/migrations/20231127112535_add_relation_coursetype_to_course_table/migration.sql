-- AlterTable
ALTER TABLE "course" ADD COLUMN     "courseTypeId" INTEGER;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_courseTypeId_fkey" FOREIGN KEY ("courseTypeId") REFERENCES "coursetype"("id") ON DELETE SET NULL ON UPDATE CASCADE;
