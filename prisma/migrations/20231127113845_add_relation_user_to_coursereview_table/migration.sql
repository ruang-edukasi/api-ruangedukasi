-- AlterTable
ALTER TABLE "coursereview" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "coursereview" ADD CONSTRAINT "coursereview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
