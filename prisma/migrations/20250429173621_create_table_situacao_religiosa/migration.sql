/*
  Warnings:

  - You are about to drop the column `tipoPessoaId` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the `tipoPessoa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `situacaoReligiosaId` to the `pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_tipoPessoaId_fkey";

-- AlterTable
ALTER TABLE "pessoa" DROP COLUMN "tipoPessoaId",
ADD COLUMN     "situacaoReligiosaId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tipoPessoa";

-- CreateTable
CREATE TABLE "situacaoReligiosa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "sexoUnico" "Sexo",

    CONSTRAINT "situacaoReligiosa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "situacaoReligiosa_descricao_key" ON "situacaoReligiosa"("descricao");

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_situacaoReligiosaId_fkey" FOREIGN KEY ("situacaoReligiosaId") REFERENCES "situacaoReligiosa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
