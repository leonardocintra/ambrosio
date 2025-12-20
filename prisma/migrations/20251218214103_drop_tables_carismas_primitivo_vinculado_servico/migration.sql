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
ALTER TABLE "ambrosio"."pessoaCarismaPrimitivo" DROP CONSTRAINT "pessoaCarismaPrimitivo_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaPrimitivo" DROP CONSTRAINT "pessoaCarismaPrimitivo_tipoCarismaPrimitivoId_fkey";

-- DropForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaServico" DROP CONSTRAINT "pessoaCarismaServico_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaServico" DROP CONSTRAINT "pessoaCarismaServico_tipoCarismaServicoId_fkey";

-- DropForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaVinculado" DROP CONSTRAINT "pessoaCarismaVinculado_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaVinculado" DROP CONSTRAINT "pessoaCarismaVinculado_tipoCarismaVinculadoId_fkey";

-- DropTable
DROP TABLE "ambrosio"."pessoaCarismaPrimitivo";

-- DropTable
DROP TABLE "ambrosio"."pessoaCarismaServico";

-- DropTable
DROP TABLE "ambrosio"."pessoaCarismaVinculado";

-- DropTable
DROP TABLE "ambrosio"."tipoCarismaPrimitivo";

-- DropTable
DROP TABLE "ambrosio"."tipoCarismaServico";

-- DropTable
DROP TABLE "ambrosio"."tipoCarismaVinculado";
