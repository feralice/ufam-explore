/*
  Warnings:

  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Curso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CursosEmPostagem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CursoToPostagem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_areaId_fkey";

-- DropForeignKey
ALTER TABLE "CursosEmPostagem" DROP CONSTRAINT "CursosEmPostagem_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "CursosEmPostagem" DROP CONSTRAINT "CursosEmPostagem_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "_CursoToPostagem" DROP CONSTRAINT "_CursoToPostagem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CursoToPostagem" DROP CONSTRAINT "_CursoToPostagem_B_fkey";

-- AlterTable
ALTER TABLE "Downvote" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tipo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Area";

-- DropTable
DROP TABLE "Curso";

-- DropTable
DROP TABLE "CursosEmPostagem";

-- DropTable
DROP TABLE "_CursoToPostagem";
