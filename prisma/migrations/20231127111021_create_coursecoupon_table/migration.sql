-- AlterTable
ALTER TABLE "coursereview" ALTER COLUMN "review" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;

-- CreateTable
CREATE TABLE "coursecoupon" (
    "id" SERIAL NOT NULL,
    "coupon_name" TEXT,
    "coupon_code" TEXT,
    "discount_percent" TEXT,
    "valid_until" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coursecoupon_pkey" PRIMARY KEY ("id")
);
