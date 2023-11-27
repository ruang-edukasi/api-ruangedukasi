/*
  Warnings:

  - You are about to drop the column `adminId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `courseCategoryId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `courseLevelId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `courseTypeId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `coursecontent` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `coursecoupon` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `coursereview` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `coursereview` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `courseskill` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `coursetarget` table. All the data in the column will be lost.
  - You are about to drop the column `courseCouponId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `usercourse` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `usercoursecontent` table. All the data in the column will be lost.
  - You are about to drop the column `userCourseId` on the `usercoursecontent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `usercoursecontent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_adminId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_courseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_courseLevelId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_courseTypeId_fkey";

-- DropForeignKey
ALTER TABLE "coursecontent" DROP CONSTRAINT "coursecontent_courseId_fkey";

-- DropForeignKey
ALTER TABLE "coursecoupon" DROP CONSTRAINT "coursecoupon_courseId_fkey";

-- DropForeignKey
ALTER TABLE "coursereview" DROP CONSTRAINT "coursereview_courseId_fkey";

-- DropForeignKey
ALTER TABLE "coursereview" DROP CONSTRAINT "coursereview_userId_fkey";

-- DropForeignKey
ALTER TABLE "courseskill" DROP CONSTRAINT "courseskill_courseId_fkey";

-- DropForeignKey
ALTER TABLE "coursetarget" DROP CONSTRAINT "coursetarget_courseId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_courseCouponId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_courseId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- DropForeignKey
ALTER TABLE "usercourse" DROP CONSTRAINT "usercourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "usercoursecontent" DROP CONSTRAINT "usercoursecontent_courseId_fkey";

-- DropForeignKey
ALTER TABLE "usercoursecontent" DROP CONSTRAINT "usercoursecontent_userCourseId_fkey";

-- DropForeignKey
ALTER TABLE "usercoursecontent" DROP CONSTRAINT "usercoursecontent_userId_fkey";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "adminId",
DROP COLUMN "courseCategoryId",
DROP COLUMN "courseLevelId",
DROP COLUMN "courseTypeId",
ADD COLUMN     "admin_id" INTEGER,
ADD COLUMN     "course_category_id" INTEGER,
ADD COLUMN     "course_level_id" INTEGER,
ADD COLUMN     "course_type_id" INTEGER;

-- AlterTable
ALTER TABLE "coursecontent" DROP COLUMN "courseId",
ADD COLUMN     "course_id" INTEGER;

-- AlterTable
ALTER TABLE "coursecoupon" DROP COLUMN "courseId",
ADD COLUMN     "course_id" INTEGER;

-- AlterTable
ALTER TABLE "coursereview" DROP COLUMN "courseId",
DROP COLUMN "userId",
ADD COLUMN     "course_id" INTEGER,
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "courseskill" DROP COLUMN "courseId",
ADD COLUMN     "course_id" INTEGER;

-- AlterTable
ALTER TABLE "coursetarget" DROP COLUMN "courseId",
ADD COLUMN     "course_id" INTEGER;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "courseCouponId",
DROP COLUMN "courseId",
DROP COLUMN "userId",
ADD COLUMN     "course_coupon_id" INTEGER,
ADD COLUMN     "course_id" INTEGER,
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "usercourse" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "usercoursecontent" DROP COLUMN "courseId",
DROP COLUMN "userCourseId",
DROP COLUMN "userId",
ADD COLUMN     "course_id" INTEGER,
ADD COLUMN     "user_course_id" INTEGER,
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "coursetype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_category_id_fkey" FOREIGN KEY ("course_category_id") REFERENCES "coursecategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_course_level_id_fkey" FOREIGN KEY ("course_level_id") REFERENCES "courselevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursecontent" ADD CONSTRAINT "coursecontent_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursetarget" ADD CONSTRAINT "coursetarget_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseskill" ADD CONSTRAINT "courseskill_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursereview" ADD CONSTRAINT "coursereview_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursereview" ADD CONSTRAINT "coursereview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursecoupon" ADD CONSTRAINT "coursecoupon_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_course_coupon_id_fkey" FOREIGN KEY ("course_coupon_id") REFERENCES "coursecoupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usercourse" ADD CONSTRAINT "usercourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usercoursecontent" ADD CONSTRAINT "usercoursecontent_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usercoursecontent" ADD CONSTRAINT "usercoursecontent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usercoursecontent" ADD CONSTRAINT "usercoursecontent_user_course_id_fkey" FOREIGN KEY ("user_course_id") REFERENCES "usercourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
