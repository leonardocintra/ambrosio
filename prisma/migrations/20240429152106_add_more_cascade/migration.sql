-- DropForeignKey
ALTER TABLE "equipeTipoEquipe" DROP CONSTRAINT "equipeTipoEquipe_equipeId_fkey";

-- DropForeignKey
ALTER TABLE "localidade" DROP CONSTRAINT "localidade_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "localidadeRegiao" DROP CONSTRAINT "localidadeRegiao_localidadeId_fkey";

-- DropForeignKey
ALTER TABLE "paroquia" DROP CONSTRAINT "paroquia_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "paroquiaPessoas" DROP CONSTRAINT "paroquiaPessoas_paroquiaId_fkey";

-- DropForeignKey
ALTER TABLE "paroquiaPessoas" DROP CONSTRAINT "paroquiaPessoas_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "passaportePessoa" DROP CONSTRAINT "passaportePessoa_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "pessoaContato" DROP CONSTRAINT "pessoaContato_pessoaId_fkey";

-- AddForeignKey
ALTER TABLE "passaportePessoa" ADD CONSTRAINT "passaportePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaContato" ADD CONSTRAINT "pessoaContato_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquiaPessoas" ADD CONSTRAINT "paroquiaPessoas_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquiaPessoas" ADD CONSTRAINT "paroquiaPessoas_paroquiaId_fkey" FOREIGN KEY ("paroquiaId") REFERENCES "paroquia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeTipoEquipe" ADD CONSTRAINT "equipeTipoEquipe_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidadeRegiao" ADD CONSTRAINT "localidadeRegiao_localidadeId_fkey" FOREIGN KEY ("localidadeId") REFERENCES "localidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
