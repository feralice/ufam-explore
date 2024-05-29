/*
  Warnings:

  - You are about to drop the column `data` on the `Downvote` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Upvote` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Downvote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Upvote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Downvote" DROP COLUMN "data",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Upvote" DROP COLUMN "data",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
