-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateEnum
CREATE TYPE "tipoCarismaEnum" AS ENUM ('SERVICO', 'VINCULADO', 'PRIMITIVO');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'CATEQUISTA_NACIONAL', 'CATEQUISTA_GRANDE_REGIAO', 'CATEQUISTA_REGIAO', 'CATEQUISTA_SETOR', 'CATEQUISTA_PAROQUIA', 'SECRETARIA_CNC', 'SECRETARIA_PAROQUIA', 'NAO_IDENTIFICADO');

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
    "bairro" VARCHAR(50) NOT NULL,
    "numero" VARCHAR(5) NOT NULL,
    "cidadeId" INTEGER NOT NULL,
    "observacao" VARCHAR(250),

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
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
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "situacaoReligiosaId" INTEGER NOT NULL,
    "externalId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "situacaoReligiosa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "sexoUnico" "Sexo",

    CONSTRAINT "situacaoReligiosa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carisma" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "tipo" "tipoCarismaEnum" NOT NULL,
    "casalAndaJunto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "carisma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoaCarisma" (
    "id" SERIAL NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "carismaId" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoaCarisma_pkey" PRIMARY KEY ("id")
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
    "enderecoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diocese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paroquia" (
    "id" SERIAL NOT NULL,
    "enderecoId" INTEGER NOT NULL,
    "dioceseId" INTEGER NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "setorId" INTEGER NOT NULL,

    CONSTRAINT "paroquia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etapa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "etapa_pkey" PRIMARY KEY ("id")
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
    "descricao" VARCHAR(80) NOT NULL,
    "tipoEquipeId" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipePessoa" (
    "id" SERIAL NOT NULL,
    "equipeId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipePessoa_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "tipoLocalidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoLocalidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'NAO_IDENTIFICADO',
    "whatsapp" VARCHAR(20),
    "verifiedWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pessoaId" INTEGER,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "regiaoId" INTEGER NOT NULL,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "macroRegiao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "macroRegiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regiao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "macroRegiaoId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "regiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comunidade" (
    "id" SERIAL NOT NULL,
    "numeroDaComunidade" INTEGER NOT NULL,
    "quantidadeMembros" INTEGER NOT NULL,
    "observacao" VARCHAR(250),
    "paroquiaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comunidadeEtapa" (
    "id" SERIAL NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    "etapaId" INTEGER NOT NULL,
    "dataInicio" TIMESTAMP(3),
    "dataFim" TIMESTAMP(3),
    "observacao" VARCHAR(250),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "equipeId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localConvivencia" VARCHAR(180),

    CONSTRAINT "comunidadeEtapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comunidadePessoa" (
    "id" SERIAL NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "dataEntrada" TIMESTAMP(3) NOT NULL,
    "dataSaida" TIMESTAMP(3),
    "observacao" VARCHAR(250),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidadePessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comunidadeHistorico" (
    "id" SERIAL NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidadeHistorico_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "estadoCivil_descricao_key" ON "estadoCivil"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "escolaridade_descricao_key" ON "escolaridade"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_externalId_key" ON "pessoa"("externalId");

-- CreateIndex
CREATE INDEX "pessoa_externalId_idx" ON "pessoa"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "situacaoReligiosa_descricao_key" ON "situacaoReligiosa"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "carisma_descricao_tipo_key" ON "carisma"("descricao", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaCarisma_pessoaId_carismaId_key" ON "pessoaCarisma"("pessoaId", "carismaId");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaCasal_pessoaMaridoId_pessoaMulherId_key" ON "pessoaCasal"("pessoaMaridoId", "pessoaMulherId");

-- CreateIndex
CREATE UNIQUE INDEX "equipePessoa_equipeId_pessoaId_key" ON "equipePessoa"("equipeId", "pessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "setor_descricao_key" ON "setor"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "setor_descricao_regiaoId_key" ON "setor"("descricao", "regiaoId");

-- CreateIndex
CREATE UNIQUE INDEX "regiao_descricao_key" ON "regiao"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "regiao_descricao_macroRegiaoId_key" ON "regiao"("descricao", "macroRegiaoId");

-- CreateIndex
CREATE UNIQUE INDEX "comunidade_numeroDaComunidade_paroquiaId_key" ON "comunidade"("numeroDaComunidade", "paroquiaId");

-- CreateIndex
CREATE UNIQUE INDEX "comunidadePessoa_comunidadeId_pessoaId_key" ON "comunidadePessoa"("comunidadeId", "pessoaId");

-- AddForeignKey
ALTER TABLE "estado" ADD CONSTRAINT "estado_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidade" ADD CONSTRAINT "cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_situacaoReligiosaId_fkey" FOREIGN KEY ("situacaoReligiosaId") REFERENCES "situacaoReligiosa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_carismaId_fkey" FOREIGN KEY ("carismaId") REFERENCES "carisma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMaridoId_fkey" FOREIGN KEY ("pessoaMaridoId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMulherId_fkey" FOREIGN KEY ("pessoaMulherId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passaportePessoa" ADD CONSTRAINT "passaportePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaContato" ADD CONSTRAINT "pessoaContato_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_tipoDioceseId_fkey" FOREIGN KEY ("tipoDioceseId") REFERENCES "tipoDiocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipe" ADD CONSTRAINT "equipe_tipoEquipeId_fkey" FOREIGN KEY ("tipoEquipeId") REFERENCES "tipoEquipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipePessoa" ADD CONSTRAINT "equipePessoa_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipePessoa" ADD CONSTRAINT "equipePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_tipoLocalidadeId_fkey" FOREIGN KEY ("tipoLocalidadeId") REFERENCES "tipoLocalidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setor" ADD CONSTRAINT "setor_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regiao" ADD CONSTRAINT "regiao_macroRegiaoId_fkey" FOREIGN KEY ("macroRegiaoId") REFERENCES "macroRegiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidade" ADD CONSTRAINT "comunidade_paroquiaId_fkey" FOREIGN KEY ("paroquiaId") REFERENCES "paroquia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadeEtapa" ADD CONSTRAINT "comunidadeEtapa_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadeEtapa" ADD CONSTRAINT "comunidadeEtapa_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadeEtapa" ADD CONSTRAINT "comunidadeEtapa_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "etapa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadePessoa" ADD CONSTRAINT "comunidadePessoa_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadePessoa" ADD CONSTRAINT "comunidadePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comunidadeHistorico" ADD CONSTRAINT "comunidadeHistorico_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
