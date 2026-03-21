-- AlterTable
ALTER TABLE "comunidade" ADD COLUMN     "etapaAtualId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "comunidade" ADD CONSTRAINT "comunidade_etapaAtualId_fkey" FOREIGN KEY ("etapaAtualId") REFERENCES "etapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
