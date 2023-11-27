-- CreateTable
CREATE TABLE "coursecontent" (
    "id" SERIAL NOT NULL,
    "content_title" TEXT,
    "video_link" TEXT,
    "reading_link" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coursecontent_pkey" PRIMARY KEY ("id")
);
