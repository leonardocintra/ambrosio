/*
  Warnings:

  - You are about to drop the column `conhecidoPor` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `escolaridadeId` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `estadoCivilId` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidade` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `pessoa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ambrosio"."pessoa" DROP CONSTRAINT "pessoa_escolaridadeId_fkey";

-- DropForeignKey
ALTER TABLE "ambrosio"."pessoa" DROP CONSTRAINT "pessoa_estadoCivilId_fkey";

-- AlterTable
ALTER TABLE "ambrosio"."pessoa" DROP COLUMN "conhecidoPor",
DROP COLUMN "cpf",
DROP COLUMN "dataNascimento",
DROP COLUMN "escolaridadeId",
DROP COLUMN "estadoCivilId",
DROP COLUMN "foto",
DROP COLUMN "nacionalidade",
DROP COLUMN "nome",
DROP COLUMN "sexo";
