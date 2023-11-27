-- AlterTable
ALTER TABLE "coursereview" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "coursereview" ADD CONSTRAINT "coursereview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
