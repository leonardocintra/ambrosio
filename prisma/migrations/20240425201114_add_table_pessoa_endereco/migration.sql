-- CreateTable
CREATE TABLE "pessoaEndereco" (
    "pessoaId" INTEGER NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaEndereco_pkey" PRIMARY KEY ("pessoaId","enderecoId")
);

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
