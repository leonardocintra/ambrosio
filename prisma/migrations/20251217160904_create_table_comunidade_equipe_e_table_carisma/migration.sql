/*
  Warnings:

  - Made the column `externalId` on table `pessoa` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "tipoCarismaEnum" AS ENUM ('SERVICO', 'VINCULADO', 'PRIMITIVO');

-- AlterTable
ALTER TABLE "pessoa" ALTER COLUMN "externalId" SET NOT NULL;

-- CreateTable
CREATE TABLE "carisma" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "tipo" "tipoCarismaEnum" NOT NULL,
    "casalAndaJunto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "carisma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoaCarisma" (
    "id" SERIAL NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "carismaId" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoaCarisma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comunidadeEquipe" (
    "id" SERIAL NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    "equipeId" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidadeEquipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carisma_descricao_tipo_key" ON "carisma"("descricao", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaCarisma_pessoaId_carismaId_key" ON "pessoaCarisma"("pessoaId", "carismaId");

-- CreateIndex
CREATE UNIQUE INDEX "comunidadeEquipe_comunidadeId_equipeId_key" ON "comunidadeEquipe"("comunidadeId", "equipeId");

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_carismaId_fkey" FOREIGN KEY ("carismaId") REFERENCES "carisma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadeEquipe" ADD CONSTRAINT "comunidadeEquipe_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadeEquipe" ADD CONSTRAINT "comunidadeEquipe_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
