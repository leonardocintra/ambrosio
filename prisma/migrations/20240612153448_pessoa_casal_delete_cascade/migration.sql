-- DropForeignKey
ALTER TABLE "pessoaCasal" DROP CONSTRAINT "pessoaCasal_pessoaMaridoId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaCasal" DROP CONSTRAINT "pessoaCasal_pessoaMulherId_fkey";

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMaridoId_fkey" FOREIGN KEY ("pessoaMaridoId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMulherId_fkey" FOREIGN KEY ("pessoaMulherId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
