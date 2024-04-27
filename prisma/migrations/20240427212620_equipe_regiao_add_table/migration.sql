/*
  Warnings:

  - You are about to drop the column `regiaoId` on the `diocese` table. All the data in the column will be lost.
  - You are about to drop the `regioesCaminho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "diocese" DROP CONSTRAINT "diocese_regiaoId_fkey";

-- AlterTable
ALTER TABLE "diocese" DROP COLUMN "regiaoId";

-- AlterTable
ALTER TABLE "pessoaCasal" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "pessoaCasal_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "regioesCaminho";

-- CreateTable
CREATE TABLE "regiao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "regiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipe" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipeRegiao" (
    "equipeId" INTEGER NOT NULL,
    "regiaoId" INTEGER NOT NULL,

    CONSTRAINT "equipeRegiao_pkey" PRIMARY KEY ("equipeId","regiaoId")
);

-- CreateTable
CREATE TABLE "equipePessoas" (
    "equipeId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,

    CONSTRAINT "equipePessoas_pkey" PRIMARY KEY ("equipeId","pessoaId")
);

-- AddForeignKey
ALTER TABLE "equipeRegiao" ADD CONSTRAINT "equipeRegiao_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeRegiao" ADD CONSTRAINT "equipeRegiao_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipePessoas" ADD CONSTRAINT "equipePessoas_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipePessoas" ADD CONSTRAINT "equipePessoas_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
