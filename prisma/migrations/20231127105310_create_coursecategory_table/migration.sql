-- CreateTable
CREATE TABLE "coursecategory" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "coursecategory_pkey" PRIMARY KEY ("id")
);
