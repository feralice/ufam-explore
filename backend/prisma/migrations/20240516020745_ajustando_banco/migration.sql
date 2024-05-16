/*
  Warnings:

  - You are about to drop the column `descricao` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `respostaId` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Downvote` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Downvote` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `postagemId` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `data_evento` on the `Postagem` table. All the data in the column will be lost.
  - You are about to drop the column `data_postagem` on the `Postagem` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Postagem` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Postagem` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Postagem` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Postagem` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Upvote` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Upvote` table. All the data in the column will be lost.
  - You are about to drop the column `data_cadastro` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `foto_de_perfil` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Salvo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Perfil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conteudo` to the `Comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Downvote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texto` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Upvote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataCadastro` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_respostaId_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_userId_fkey";

-- DropForeignKey
ALTER TABLE "Downvote" DROP CONSTRAINT "Downvote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "Postagem" DROP CONSTRAINT "Postagem_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Postagem" DROP CONSTRAINT "Postagem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Salvo" DROP CONSTRAINT "Salvo_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "Salvo" DROP CONSTRAINT "Salvo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_userId_fkey";

-- DropIndex
DROP INDEX "Comentario_postagemId_idx";

-- DropIndex
DROP INDEX "Comentario_userId_idx";

-- DropIndex
DROP INDEX "Downvote_postagemId_idx";

-- DropIndex
DROP INDEX "Downvote_userId_idx";

-- DropIndex
DROP INDEX "Evento_postagemId_idx";

-- DropIndex
DROP INDEX "Postagem_tagId_idx";

-- DropIndex
DROP INDEX "Postagem_userId_idx";

-- DropIndex
DROP INDEX "Upvote_postagemId_idx";

-- DropIndex
DROP INDEX "Upvote_userId_idx";

-- DropIndex
DROP INDEX "Usuario_perfilId_idx";

-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "descricao",
DROP COLUMN "respostaId",
DROP COLUMN "userId",
ADD COLUMN     "conteudo" TEXT NOT NULL,
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Downvote" DROP COLUMN "quantidade",
DROP COLUMN "userId",
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "descricao",
DROP COLUMN "imagem",
DROP COLUMN "localizacao",
DROP COLUMN "postagemId",
DROP COLUMN "titulo",
ADD COLUMN     "local" TEXT NOT NULL,
ADD COLUMN     "texto" TEXT;

-- AlterTable
ALTER TABLE "Postagem" DROP COLUMN "data_evento",
DROP COLUMN "data_postagem",
DROP COLUMN "descricao",
DROP COLUMN "imagem",
DROP COLUMN "tagId",
DROP COLUMN "userId",
ADD COLUMN     "eventoId" TEXT,
ADD COLUMN     "texto" TEXT NOT NULL,
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Upvote" DROP COLUMN "quantidade",
DROP COLUMN "userId",
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "data_cadastro",
DROP COLUMN "descricao",
DROP COLUMN "foto_de_perfil",
ADD COLUMN     "biografia" TEXT,
ADD COLUMN     "dataCadastro" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fotoPerfil" TEXT;

-- DropTable
DROP TABLE "Salvo";

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salvar" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salvar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsEmPostagem" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,

    CONSTRAINT "TagsEmPostagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursosEmPostagem" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,

    CONSTRAINT "CursosEmPostagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CursoToPostagem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostagemToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CursoToPostagem_AB_unique" ON "_CursoToPostagem"("A", "B");

-- CreateIndex
CREATE INDEX "_CursoToPostagem_B_index" ON "_CursoToPostagem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostagemToTag_AB_unique" ON "_PostagemToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostagemToTag_B_index" ON "_PostagemToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_nome_key" ON "Perfil"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "Tag"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cnpj_key" ON "Usuario"("cnpj");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postagem" ADD CONSTRAINT "Postagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postagem" ADD CONSTRAINT "Postagem_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salvar" ADD CONSTRAINT "Salvar_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salvar" ADD CONSTRAINT "Salvar_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsEmPostagem" ADD CONSTRAINT "TagsEmPostagem_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsEmPostagem" ADD CONSTRAINT "TagsEmPostagem_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursosEmPostagem" ADD CONSTRAINT "CursosEmPostagem_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursosEmPostagem" ADD CONSTRAINT "CursosEmPostagem_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToPostagem" ADD CONSTRAINT "_CursoToPostagem_A_fkey" FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToPostagem" ADD CONSTRAINT "_CursoToPostagem_B_fkey" FOREIGN KEY ("B") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostagemToTag" ADD CONSTRAINT "_PostagemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostagemToTag" ADD CONSTRAINT "_PostagemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
