/*
  Warnings:

  - You are about to drop the column `descricao` on the `comunidade` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ambrosio"."comunidadeEtapa_comunidadeId_etapaId_key";

-- AlterTable
ALTER TABLE "ambrosio"."comunidade" DROP COLUMN "descricao";
