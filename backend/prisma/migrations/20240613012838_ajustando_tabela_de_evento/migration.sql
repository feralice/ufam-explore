/*
  Warnings:

  - You are about to drop the column `data` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `local` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `texto` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `dataFinal` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizacao` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "data",
DROP COLUMN "local",
DROP COLUMN "texto",
ADD COLUMN     "dataFinal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "localizacao" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;
