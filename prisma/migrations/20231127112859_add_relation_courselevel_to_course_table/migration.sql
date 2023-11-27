-- AlterTable
ALTER TABLE "course" ADD COLUMN     "courseLevelId" INTEGER;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_courseLevelId_fkey" FOREIGN KEY ("courseLevelId") REFERENCES "courselevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
