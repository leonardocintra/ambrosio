/*
  Warnings:

  - You are about to drop the column `tipoCarismaId` on the `pessoa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "localidade" DROP CONSTRAINT "localidade_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_tipoCarismaId_fkey";

-- AlterTable
ALTER TABLE "pessoa" DROP COLUMN "tipoCarismaId",
ADD COLUMN     "dataNascimento" DATE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
