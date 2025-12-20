/*
  Warnings:

  - You are about to drop the `pessoaCarismaPrimitivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoaCarismaServico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoaCarismaVinculado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoCarismaPrimitivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoCarismaServico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoCarismaVinculado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pessoaCarismaPrimitivo" DROP CONSTRAINT "pessoaCarismaPrimitivo_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaCarismaPrimitivo" DROP CONSTRAINT "pessoaCarismaPrimitivo_tipoCarismaPrimitivoId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaCarismaServico" DROP CONSTRAINT "pessoaCarismaServico_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaCarismaServico" DROP CONSTRAINT "pessoaCarismaServico_tipoCarismaServicoId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaCarismaVinculado" DROP CONSTRAINT "pessoaCarismaVinculado_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaCarismaVinculado" DROP CONSTRAINT "pessoaCarismaVinculado_tipoCarismaVinculadoId_fkey";

-- DropTable
DROP TABLE "pessoaCarismaPrimitivo";

-- DropTable
DROP TABLE "pessoaCarismaServico";

-- DropTable
DROP TABLE "pessoaCarismaVinculado";

-- DropTable
DROP TABLE "tipoCarismaPrimitivo";

-- DropTable
DROP TABLE "tipoCarismaServico";

-- DropTable
DROP TABLE "tipoCarismaVinculado";
