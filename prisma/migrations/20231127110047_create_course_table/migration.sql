-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "instructor_name" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_description" TEXT,
    "price" BIGINT,
    "rating" INTEGER,
    "telegram_link" TEXT,
    "whatsapp_link" TEXT,
    "student_count" INTEGER,
    "video_count" INTEGER,
    "reading_count" INTEGER,
    "content_count" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);
