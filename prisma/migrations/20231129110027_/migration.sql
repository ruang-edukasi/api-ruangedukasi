-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_course_category_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_course_level_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_course_type_id_fkey";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "admin_id" DROP NOT NULL,
ALTER COLUMN "course_category_id" DROP NOT NULL,
ALTER COLUMN "course_level_id" DROP NOT NULL,
ALTER COLUMN "course_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "coursetype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_category_id_fkey" FOREIGN KEY ("course_category_id") REFERENCES "coursecategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_level_id_fkey" FOREIGN KEY ("course_level_id") REFERENCES "courselevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
