/*
  Warnings:

  - You are about to drop the column `data` on the `Postagem` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Postagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Postagem" DROP COLUMN "data",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
