-- AlterTable
ALTER TABLE "usercourse" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "usercourse" ADD CONSTRAINT "usercourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
