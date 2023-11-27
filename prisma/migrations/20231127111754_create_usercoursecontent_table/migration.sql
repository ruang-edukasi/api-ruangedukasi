/*
  Warnings:

  - Added the required column `updated_at` to the `usercourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usercourse" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "usercoursecontent" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usercoursecontent_pkey" PRIMARY KEY ("id")
);
