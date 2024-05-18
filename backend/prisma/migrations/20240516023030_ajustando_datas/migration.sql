/*
  Warnings:

  - The primary key for the `Perfil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Perfil` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dataCadastro` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `perfilId` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_perfilId_fkey";

-- AlterTable
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "dataCadastro",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "perfilId",
ADD COLUMN     "perfilId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
