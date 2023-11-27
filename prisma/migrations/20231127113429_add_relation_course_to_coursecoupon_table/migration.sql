-- AlterTable
ALTER TABLE "coursecoupon" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "coursecoupon" ADD CONSTRAINT "coursecoupon_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
