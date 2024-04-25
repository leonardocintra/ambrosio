-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMININO');

-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "sexo" "Sexo" NOT NULL DEFAULT 'MASCULINO';

-- AlterTable
ALTER TABLE "tipoCarisma" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(30);
