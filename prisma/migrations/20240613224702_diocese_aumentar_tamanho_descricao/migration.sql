-- AlterTable
ALTER TABLE "diocese" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(90);

-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "conhecidoPor" VARCHAR(30);
