-- CreateTable
CREATE TABLE "endereco" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(50) NOT NULL,
    "cidade" VARCHAR(50) NOT NULL,
    "bairro" VARCHAR(50) NOT NULL,
    "numero" VARCHAR(5) NOT NULL,
    "UF" VARCHAR(2) NOT NULL,
    "pais" VARCHAR(20) NOT NULL DEFAULT 'Brasil',

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoCarisma" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tipoCarisma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadoCivil" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "estadoCivil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escolaridade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "escolaridade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "nacionalidade" VARCHAR(50) NOT NULL,
    "estadoCivilId" INTEGER NOT NULL,
    "foto" TEXT,
    "escolaridadeId" INTEGER,
    "tipoCarismaId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoaCasal" (
    "pessoaMaridoId" INTEGER NOT NULL,
    "pessoaMulherId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "passaportePessoa" (
    "id" SERIAL NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "numero" TEXT NOT NULL,
    "dataExpiracao" TIMESTAMP(3) NOT NULL,
    "renovado" BOOLEAN NOT NULL DEFAULT false,
    "dataRenovacao" TIMESTAMP(3),

    CONSTRAINT "passaportePessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoaContato" (
    "id" SERIAL NOT NULL,
    "telefoneResidencial" TEXT,
    "telefoneCelular" TEXT,
    "observacao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT,
    "pessoaId" INTEGER NOT NULL,

    CONSTRAINT "pessoaContato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoDiocese" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tipoDiocese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diocese" (
    "id" SERIAL NOT NULL,
    "tipoDioceseId" INTEGER NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "diocese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paroquia" (
    "id" SERIAL NOT NULL,
    "enderecoId" INTEGER NOT NULL,
    "dioceseId" INTEGER NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "paroquia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paroquiaPessoas" (
    "pessoaId" INTEGER NOT NULL,
    "paroquiaId" INTEGER NOT NULL,

    CONSTRAINT "paroquiaPessoas_pkey" PRIMARY KEY ("pessoaId","paroquiaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "estadoCivil_descricao_key" ON "estadoCivil"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "escolaridade_descricao_key" ON "escolaridade"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaCasal_pessoaMaridoId_pessoaMulherId_key" ON "pessoaCasal"("pessoaMaridoId", "pessoaMulherId");

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_estadoCivilId_fkey" FOREIGN KEY ("estadoCivilId") REFERENCES "estadoCivil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_escolaridadeId_fkey" FOREIGN KEY ("escolaridadeId") REFERENCES "escolaridade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_tipoCarismaId_fkey" FOREIGN KEY ("tipoCarismaId") REFERENCES "tipoCarisma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMaridoId_fkey" FOREIGN KEY ("pessoaMaridoId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMulherId_fkey" FOREIGN KEY ("pessoaMulherId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passaportePessoa" ADD CONSTRAINT "passaportePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaContato" ADD CONSTRAINT "pessoaContato_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_tipoDioceseId_fkey" FOREIGN KEY ("tipoDioceseId") REFERENCES "tipoDiocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquiaPessoas" ADD CONSTRAINT "paroquiaPessoas_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquiaPessoas" ADD CONSTRAINT "paroquiaPessoas_paroquiaId_fkey" FOREIGN KEY ("paroquiaId") REFERENCES "paroquia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
