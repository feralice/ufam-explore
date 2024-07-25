-- AlterTable
ALTER TABLE "Comentario" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Comentario_usuarioId_idx" ON "Comentario"("usuarioId");

-- CreateIndex
CREATE INDEX "Comentario_postagemId_idx" ON "Comentario"("postagemId");

-- CreateIndex
CREATE INDEX "Downvote_usuarioId_idx" ON "Downvote"("usuarioId");

-- CreateIndex
CREATE INDEX "Downvote_postagemId_idx" ON "Downvote"("postagemId");

-- CreateIndex
CREATE INDEX "Postagem_usuarioId_idx" ON "Postagem"("usuarioId");

-- CreateIndex
CREATE INDEX "Salvar_usuarioId_idx" ON "Salvar"("usuarioId");

-- CreateIndex
CREATE INDEX "Salvar_postagemId_idx" ON "Salvar"("postagemId");

-- CreateIndex
CREATE INDEX "Upvote_usuarioId_idx" ON "Upvote"("usuarioId");

-- CreateIndex
CREATE INDEX "Upvote_postagemId_idx" ON "Upvote"("postagemId");
