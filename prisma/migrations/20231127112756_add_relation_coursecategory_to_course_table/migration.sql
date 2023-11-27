-- AlterTable
ALTER TABLE "course" ADD COLUMN     "courseCategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "coursecategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
