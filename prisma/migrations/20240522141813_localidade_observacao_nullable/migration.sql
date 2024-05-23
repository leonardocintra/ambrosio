-- AlterTable
ALTER TABLE "localidade" ALTER COLUMN "observacao" DROP NOT NULL,
ALTER COLUMN "observacao" SET DATA TYPE TEXT;
