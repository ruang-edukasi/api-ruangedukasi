-- AlterTable
ALTER TABLE "courseskill" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "courseskill" ADD CONSTRAINT "courseskill_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
