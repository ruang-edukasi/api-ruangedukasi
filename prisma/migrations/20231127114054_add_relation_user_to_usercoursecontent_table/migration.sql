-- AlterTable
ALTER TABLE "usercoursecontent" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "usercoursecontent" ADD CONSTRAINT "usercoursecontent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
