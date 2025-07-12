/*
  Warnings:

  - You are about to drop the `equipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipePessoas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipeRegiao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipeTipoEquipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `localidadeRegiao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paroquiaPessoas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regiao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "equipePessoas" DROP CONSTRAINT "equipePessoas_equipeId_fkey";

-- DropForeignKey
ALTER TABLE "equipePessoas" DROP CONSTRAINT "equipePessoas_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "equipeRegiao" DROP CONSTRAINT "equipeRegiao_equipeId_fkey";

-- DropForeignKey
ALTER TABLE "equipeRegiao" DROP CONSTRAINT "equipeRegiao_regiaoId_fkey";

-- DropForeignKey
ALTER TABLE "equipeTipoEquipe" DROP CONSTRAINT "equipeTipoEquipe_equipeId_fkey";

-- DropForeignKey
ALTER TABLE "equipeTipoEquipe" DROP CONSTRAINT "equipeTipoEquipe_tipoEquipeId_fkey";

-- DropForeignKey
ALTER TABLE "localidadeRegiao" DROP CONSTRAINT "localidadeRegiao_localidadeId_fkey";

-- DropForeignKey
ALTER TABLE "localidadeRegiao" DROP CONSTRAINT "localidadeRegiao_regiaoId_fkey";

-- DropForeignKey
ALTER TABLE "paroquiaPessoas" DROP CONSTRAINT "paroquiaPessoas_paroquiaId_fkey";

-- DropForeignKey
ALTER TABLE "paroquiaPessoas" DROP CONSTRAINT "paroquiaPessoas_pessoaId_fkey";

-- DropTable
DROP TABLE "equipe";

-- DropTable
DROP TABLE "equipePessoas";

-- DropTable
DROP TABLE "equipeRegiao";

-- DropTable
DROP TABLE "equipeTipoEquipe";

-- DropTable
DROP TABLE "localidadeRegiao";

-- DropTable
DROP TABLE "paroquiaPessoas";

-- DropTable
DROP TABLE "regiao";
