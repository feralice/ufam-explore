-- AlterTable
ALTER TABLE "Comentario" ADD COLUMN     "tipo" TEXT DEFAULT 'comentario';

-- AlterTable
ALTER TABLE "Downvote" ADD COLUMN     "tipo" TEXT DEFAULT 'downvote';

-- AlterTable
ALTER TABLE "Salvar" ADD COLUMN     "tipo" TEXT DEFAULT 'salvar';

-- AlterTable
ALTER TABLE "Upvote" ADD COLUMN     "tipo" TEXT DEFAULT 'upvote';
