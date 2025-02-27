-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateTable
CREATE TABLE "pais" (
    "id" SERIAL NOT NULL,
    "isoAlpha2" VARCHAR(2) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "regiao" VARCHAR(100) NOT NULL,
    "subRegiao" VARCHAR(100) NOT NULL,
    "regiaoIntermediaria" VARCHAR(100),
    "lingua" VARCHAR(50) NOT NULL,
    "capital" VARCHAR(100) NOT NULL,

    CONSTRAINT "pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sigla" VARCHAR(2) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cidade_pkey" PRIMARY KEY ("id")
);

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
    "descricao" VARCHAR(30) NOT NULL,

    CONSTRAINT "tipoCarisma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadoCivil" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(20) NOT NULL,

    CONSTRAINT "estadoCivil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escolaridade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,

    CONSTRAINT "escolaridade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "conhecidoPor" VARCHAR(30),
    "sexo" "Sexo" NOT NULL DEFAULT 'MASCULINO',
    "cpf" VARCHAR(11),
    "nacionalidade" VARCHAR(50) NOT NULL,
    "dataNascimento" DATE,
    "estadoCivilId" INTEGER NOT NULL,
    "foto" TEXT,
    "escolaridadeId" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "tipoPessoaId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoPessoa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,

    CONSTRAINT "tipoPessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoaEndereco" (
    "pessoaId" INTEGER NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaEndereco_pkey" PRIMARY KEY ("pessoaId","enderecoId")
);

-- CreateTable
CREATE TABLE "pessoaCasal" (
    "id" SERIAL NOT NULL,
    "pessoaMaridoId" INTEGER NOT NULL,
    "pessoaMulherId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCasal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoaCarisma" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarisma_pkey" PRIMARY KEY ("pessoaId","tipoCarismaId")
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
    "descricao" VARCHAR(90) NOT NULL,

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

-- CreateTable
CREATE TABLE "etapa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "etapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regiao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "macroRegiao" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "regiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoEquipe" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoEquipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipe" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipeTipoEquipe" (
    "equipeId" INTEGER NOT NULL,
    "tipoEquipeId" INTEGER NOT NULL,

    CONSTRAINT "equipeTipoEquipe_pkey" PRIMARY KEY ("equipeId","tipoEquipeId")
);

-- CreateTable
CREATE TABLE "equipeRegiao" (
    "equipeId" INTEGER NOT NULL,
    "regiaoId" INTEGER NOT NULL,

    CONSTRAINT "equipeRegiao_pkey" PRIMARY KEY ("equipeId","regiaoId")
);

-- CreateTable
CREATE TABLE "equipePessoas" (
    "equipeId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,

    CONSTRAINT "equipePessoas_pkey" PRIMARY KEY ("equipeId","pessoaId")
);

-- CreateTable
CREATE TABLE "localidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,
    "dioceseId" INTEGER NOT NULL,
    "tipoLocalidadeId" INTEGER NOT NULL,
    "observacao" TEXT,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "localidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localidadeRegiao" (
    "localidadeId" INTEGER NOT NULL,
    "regiaoId" INTEGER NOT NULL,

    CONSTRAINT "localidadeRegiao_pkey" PRIMARY KEY ("localidadeId","regiaoId")
);

-- CreateTable
CREATE TABLE "tipoLocalidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoLocalidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pais_nome_key" ON "pais"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estado_nome_key" ON "estado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estado_sigla_key" ON "estado"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "cidade_nome_key" ON "cidade"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarisma_descricao_key" ON "tipoCarisma"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "estadoCivil_descricao_key" ON "estadoCivil"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "escolaridade_descricao_key" ON "escolaridade"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tipoPessoa_descricao_key" ON "tipoPessoa"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaCasal_pessoaMaridoId_pessoaMulherId_key" ON "pessoaCasal"("pessoaMaridoId", "pessoaMulherId");

-- AddForeignKey
ALTER TABLE "estado" ADD CONSTRAINT "estado_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidade" ADD CONSTRAINT "cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_estadoCivilId_fkey" FOREIGN KEY ("estadoCivilId") REFERENCES "estadoCivil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_escolaridadeId_fkey" FOREIGN KEY ("escolaridadeId") REFERENCES "escolaridade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_tipoPessoaId_fkey" FOREIGN KEY ("tipoPessoaId") REFERENCES "tipoPessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMaridoId_fkey" FOREIGN KEY ("pessoaMaridoId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMulherId_fkey" FOREIGN KEY ("pessoaMulherId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_tipoCarismaId_fkey" FOREIGN KEY ("tipoCarismaId") REFERENCES "tipoCarisma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passaportePessoa" ADD CONSTRAINT "passaportePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaContato" ADD CONSTRAINT "pessoaContato_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_tipoDioceseId_fkey" FOREIGN KEY ("tipoDioceseId") REFERENCES "tipoDiocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquiaPessoas" ADD CONSTRAINT "paroquiaPessoas_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquiaPessoas" ADD CONSTRAINT "paroquiaPessoas_paroquiaId_fkey" FOREIGN KEY ("paroquiaId") REFERENCES "paroquia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeTipoEquipe" ADD CONSTRAINT "equipeTipoEquipe_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeTipoEquipe" ADD CONSTRAINT "equipeTipoEquipe_tipoEquipeId_fkey" FOREIGN KEY ("tipoEquipeId") REFERENCES "tipoEquipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeRegiao" ADD CONSTRAINT "equipeRegiao_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeRegiao" ADD CONSTRAINT "equipeRegiao_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipePessoas" ADD CONSTRAINT "equipePessoas_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipePessoas" ADD CONSTRAINT "equipePessoas_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_tipoLocalidadeId_fkey" FOREIGN KEY ("tipoLocalidadeId") REFERENCES "tipoLocalidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidadeRegiao" ADD CONSTRAINT "localidadeRegiao_localidadeId_fkey" FOREIGN KEY ("localidadeId") REFERENCES "localidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidadeRegiao" ADD CONSTRAINT "localidadeRegiao_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
