-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "total_price" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3),
    "status" TEXT,
    "account_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);
