-- AlterTable
ALTER TABLE "order" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
