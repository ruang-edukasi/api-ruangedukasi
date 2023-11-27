-- AlterTable
ALTER TABLE "coursetarget" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "coursetarget" ADD CONSTRAINT "coursetarget_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
