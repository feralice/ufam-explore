-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "areaId" TEXT;

-- AlterTable
ALTER TABLE "Upvote" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
