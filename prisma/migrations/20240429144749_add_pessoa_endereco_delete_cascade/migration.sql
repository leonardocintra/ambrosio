-- DropForeignKey
ALTER TABLE "pessoaEndereco" DROP CONSTRAINT "pessoaEndereco_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaEndereco" DROP CONSTRAINT "pessoaEndereco_pessoaId_fkey";

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;
