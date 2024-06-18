/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `funcao` on the `Usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Usuario_cnpj_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cnpj",
DROP COLUMN "funcao",
ADD COLUMN     "curso" TEXT;
