-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "tipoPessoaId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_tipoPessoaId_fkey" FOREIGN KEY ("tipoPessoaId") REFERENCES "tipoPessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
