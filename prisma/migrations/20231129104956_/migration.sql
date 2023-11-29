/*
  Warnings:

  - Made the column `admin_id` on table `course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `course_category_id` on table `course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `course_level_id` on table `course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `course_type_id` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_course_category_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_course_level_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_course_type_id_fkey";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "admin_id" SET NOT NULL,
ALTER COLUMN "course_category_id" SET NOT NULL,
ALTER COLUMN "course_level_id" SET NOT NULL,
ALTER COLUMN "course_type_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "coursetype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_category_id_fkey" FOREIGN KEY ("course_category_id") REFERENCES "coursecategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_level_id_fkey" FOREIGN KEY ("course_level_id") REFERENCES "courselevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
