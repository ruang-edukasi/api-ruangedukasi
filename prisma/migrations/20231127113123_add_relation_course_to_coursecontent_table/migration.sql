-- AlterTable
ALTER TABLE "coursecontent" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "coursecontent" ADD CONSTRAINT "coursecontent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
