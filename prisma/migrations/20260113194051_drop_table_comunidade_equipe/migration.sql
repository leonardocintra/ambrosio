/*
  Warnings:

  - You are about to drop the `comunidadeEquipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comunidadeEquipe" DROP CONSTRAINT "comunidadeEquipe_comunidadeId_fkey";

-- DropForeignKey
ALTER TABLE "comunidadeEquipe" DROP CONSTRAINT "comunidadeEquipe_equipeId_fkey";

-- AlterTable
ALTER TABLE "comunidadeEtapa" ADD COLUMN     "localConvivencia" VARCHAR(180);

-- DropTable
DROP TABLE "comunidadeEquipe";
