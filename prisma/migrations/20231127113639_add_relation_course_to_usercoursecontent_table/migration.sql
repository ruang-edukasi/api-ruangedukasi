-- AlterTable
ALTER TABLE "usercoursecontent" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "usercoursecontent" ADD CONSTRAINT "usercoursecontent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
