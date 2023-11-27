-- AlterTable
ALTER TABLE "order" ADD COLUMN     "courseCouponId" INTEGER;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_courseCouponId_fkey" FOREIGN KEY ("courseCouponId") REFERENCES "coursecoupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
