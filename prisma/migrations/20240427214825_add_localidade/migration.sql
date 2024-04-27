-- CreateTable
CREATE TABLE "localidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,
    "dioceseId" INTEGER NOT NULL,
    "tipoDioceseId" INTEGER NOT NULL,
    "observacao" VARCHAR(200) NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "localidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localidadeRegiao" (
    "localidadeId" INTEGER NOT NULL,
    "regiaoId" INTEGER NOT NULL,

    CONSTRAINT "localidadeRegiao_pkey" PRIMARY KEY ("localidadeId","regiaoId")
);

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_tipoDioceseId_fkey" FOREIGN KEY ("tipoDioceseId") REFERENCES "tipoDiocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidadeRegiao" ADD CONSTRAINT "localidadeRegiao_localidadeId_fkey" FOREIGN KEY ("localidadeId") REFERENCES "localidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidadeRegiao" ADD CONSTRAINT "localidadeRegiao_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
