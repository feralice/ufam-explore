-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "CursosEmPostagem" DROP CONSTRAINT "CursosEmPostagem_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "CursosEmPostagem" DROP CONSTRAINT "CursosEmPostagem_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "Downvote" DROP CONSTRAINT "Downvote_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "Downvote" DROP CONSTRAINT "Downvote_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Postagem" DROP CONSTRAINT "Postagem_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Salvar" DROP CONSTRAINT "Salvar_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "Salvar" DROP CONSTRAINT "Salvar_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "TagsEmPostagem" DROP CONSTRAINT "TagsEmPostagem_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "TagsEmPostagem" DROP CONSTRAINT "TagsEmPostagem_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "Postagem" ADD CONSTRAINT "Postagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salvar" ADD CONSTRAINT "Salvar_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salvar" ADD CONSTRAINT "Salvar_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsEmPostagem" ADD CONSTRAINT "TagsEmPostagem_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsEmPostagem" ADD CONSTRAINT "TagsEmPostagem_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursosEmPostagem" ADD CONSTRAINT "CursosEmPostagem_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursosEmPostagem" ADD CONSTRAINT "CursosEmPostagem_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
