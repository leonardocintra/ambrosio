-- DropForeignKey
ALTER TABLE "comunidade" DROP CONSTRAINT "comunidade_etapaAtualId_fkey";

-- AlterTable
ALTER TABLE "comunidade" ALTER COLUMN "etapaAtualId" DROP NOT NULL,
ALTER COLUMN "etapaAtualId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "comunidade" ADD CONSTRAINT "comunidade_etapaAtualId_fkey" FOREIGN KEY ("etapaAtualId") REFERENCES "etapa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
