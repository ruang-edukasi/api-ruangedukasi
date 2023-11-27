-- AlterTable
ALTER TABLE "usercoursecontent" ADD COLUMN     "userCourseId" INTEGER;

-- AddForeignKey
ALTER TABLE "usercoursecontent" ADD CONSTRAINT "usercoursecontent_userCourseId_fkey" FOREIGN KEY ("userCourseId") REFERENCES "usercourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
