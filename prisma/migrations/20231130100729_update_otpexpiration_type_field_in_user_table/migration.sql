/*
  Warnings:

  - The `otp_expiration` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "otp_expiration",
ADD COLUMN     "otp_expiration" TIMESTAMP(3);
