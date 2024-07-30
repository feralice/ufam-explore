-- CreateIndex
CREATE INDEX "Evento_dataInicio_idx" ON "Evento"("dataInicio");

-- CreateIndex
CREATE INDEX "Postagem_eventoId_idx" ON "Postagem"("eventoId");

-- CreateIndex
CREATE INDEX "Tag_nome_idx" ON "Tag"("nome");

-- CreateIndex
CREATE INDEX "TagsEmPostagem_tagId_idx" ON "TagsEmPostagem"("tagId");

-- CreateIndex
CREATE INDEX "TagsEmPostagem_postagemId_idx" ON "TagsEmPostagem"("postagemId");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");
