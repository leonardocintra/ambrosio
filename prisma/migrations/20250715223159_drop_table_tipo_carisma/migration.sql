/*
  Warnings:

  - You are about to drop the `pessoaCarisma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoCarisma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pessoaCarisma" DROP CONSTRAINT "pessoaCarisma_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaCarisma" DROP CONSTRAINT "pessoaCarisma_tipoCarismaId_fkey";

-- DropTable
DROP TABLE "pessoaCarisma";

-- DropTable
DROP TABLE "tipoCarisma";
