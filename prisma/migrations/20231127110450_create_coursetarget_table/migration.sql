-- CreateTable
CREATE TABLE "coursetarget" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coursetarget_pkey" PRIMARY KEY ("id")
);
