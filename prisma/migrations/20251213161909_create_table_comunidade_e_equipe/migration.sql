-- CreateTable
CREATE TABLE "ambrosio"."equipe" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,
    "tipoEquipeId" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."equipePessoa" (
    "id" SERIAL NOT NULL,
    "equipeId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipePessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."comunidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80),
    "numeroDaComunidade" INTEGER NOT NULL,
    "quantidadeMembros" INTEGER NOT NULL,
    "observacao" VARCHAR(250),
    "paroquiaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."comunidadeEtapa" (
    "id" SERIAL NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    "etapaId" INTEGER NOT NULL,
    "dataInicio" TIMESTAMP(3),
    "dataFim" TIMESTAMP(3),
    "observacao" VARCHAR(250),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidadeEtapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."comunidadePessoa" (
    "id" SERIAL NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "dataEntrada" TIMESTAMP(3) NOT NULL,
    "dataSaida" TIMESTAMP(3),
    "observacao" VARCHAR(250),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidadePessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipePessoa_equipeId_pessoaId_key" ON "ambrosio"."equipePessoa"("equipeId", "pessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "comunidade_numeroDaComunidade_paroquiaId_key" ON "ambrosio"."comunidade"("numeroDaComunidade", "paroquiaId");

-- CreateIndex
CREATE UNIQUE INDEX "comunidadeEtapa_comunidadeId_etapaId_key" ON "ambrosio"."comunidadeEtapa"("comunidadeId", "etapaId");

-- CreateIndex
CREATE UNIQUE INDEX "comunidadePessoa_comunidadeId_pessoaId_key" ON "ambrosio"."comunidadePessoa"("comunidadeId", "pessoaId");

-- AddForeignKey
ALTER TABLE "ambrosio"."equipe" ADD CONSTRAINT "equipe_tipoEquipeId_fkey" FOREIGN KEY ("tipoEquipeId") REFERENCES "ambrosio"."tipoEquipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."equipePessoa" ADD CONSTRAINT "equipePessoa_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "ambrosio"."equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."equipePessoa" ADD CONSTRAINT "equipePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."comunidade" ADD CONSTRAINT "comunidade_paroquiaId_fkey" FOREIGN KEY ("paroquiaId") REFERENCES "ambrosio"."paroquia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."comunidadeEtapa" ADD CONSTRAINT "comunidadeEtapa_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "ambrosio"."comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."comunidadeEtapa" ADD CONSTRAINT "comunidadeEtapa_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "ambrosio"."etapa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."comunidadePessoa" ADD CONSTRAINT "comunidadePessoa_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "ambrosio"."comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."comunidadePessoa" ADD CONSTRAINT "comunidadePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
