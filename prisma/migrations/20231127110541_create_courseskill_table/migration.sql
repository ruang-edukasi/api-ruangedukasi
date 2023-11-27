-- CreateTable
CREATE TABLE "courseskill" (
    "id" SERIAL NOT NULL,
    "skill_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courseskill_pkey" PRIMARY KEY ("id")
);
