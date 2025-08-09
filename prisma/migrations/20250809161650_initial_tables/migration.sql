-- CreateEnum
CREATE TYPE "ambrosio"."Sexo" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateEnum
CREATE TYPE "ambrosio"."roles" AS ENUM ('ADMIN', 'CATEQUISTA_NACIONAL', 'CATEQUISTA_GRANDE_REGIAO', 'CATEQUISTA_REGIAO', 'CATEQUISTA_SETOR', 'CATEQUISTA_PAROQUIA', 'SECRETARIA_CNC', 'SECRETARIA_PAROQUIA', 'NAO_IDENTIFICADO');

-- CreateTable
CREATE TABLE "ambrosio"."pais" (
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
CREATE TABLE "ambrosio"."estado" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sigla" VARCHAR(2) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."cidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."endereco" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(50) NOT NULL,
    "bairro" VARCHAR(50) NOT NULL,
    "numero" VARCHAR(5) NOT NULL,
    "cidadeId" INTEGER NOT NULL DEFAULT 1,
    "observacao" VARCHAR(250),

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."estadoCivil" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(20) NOT NULL,

    CONSTRAINT "estadoCivil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."escolaridade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,

    CONSTRAINT "escolaridade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."pessoa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "conhecidoPor" VARCHAR(30),
    "sexo" "ambrosio"."Sexo" NOT NULL DEFAULT 'MASCULINO',
    "cpf" VARCHAR(11),
    "nacionalidade" VARCHAR(50) NOT NULL,
    "dataNascimento" DATE,
    "estadoCivilId" INTEGER NOT NULL,
    "foto" TEXT,
    "escolaridadeId" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "situacaoReligiosaId" INTEGER NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."situacaoReligiosa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "sexoUnico" "ambrosio"."Sexo",

    CONSTRAINT "situacaoReligiosa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."tipoCarismaServico" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoCarismaServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."tipoCarismaVinculado" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoCarismaVinculado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."tipoCarismaPrimitivo" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoCarismaPrimitivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."pessoaCarismaServico" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaServicoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarismaServico_pkey" PRIMARY KEY ("pessoaId","tipoCarismaServicoId")
);

-- CreateTable
CREATE TABLE "ambrosio"."pessoaCarismaVinculado" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaVinculadoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarismaVinculado_pkey" PRIMARY KEY ("pessoaId","tipoCarismaVinculadoId")
);

-- CreateTable
CREATE TABLE "ambrosio"."pessoaCarismaPrimitivo" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaPrimitivoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarismaPrimitivo_pkey" PRIMARY KEY ("pessoaId","tipoCarismaPrimitivoId")
);

-- CreateTable
CREATE TABLE "ambrosio"."pessoaEndereco" (
    "pessoaId" INTEGER NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaEndereco_pkey" PRIMARY KEY ("pessoaId","enderecoId")
);

-- CreateTable
CREATE TABLE "ambrosio"."pessoaCasal" (
    "id" SERIAL NOT NULL,
    "pessoaMaridoId" INTEGER NOT NULL,
    "pessoaMulherId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCasal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."passaportePessoa" (
    "id" SERIAL NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    "numero" TEXT NOT NULL,
    "dataExpiracao" TIMESTAMP(3) NOT NULL,
    "renovado" BOOLEAN NOT NULL DEFAULT false,
    "dataRenovacao" TIMESTAMP(3),

    CONSTRAINT "passaportePessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."pessoaContato" (
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
CREATE TABLE "ambrosio"."tipoDiocese" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tipoDiocese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."diocese" (
    "id" SERIAL NOT NULL,
    "tipoDioceseId" INTEGER NOT NULL,
    "descricao" VARCHAR(90) NOT NULL,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "diocese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."paroquia" (
    "id" SERIAL NOT NULL,
    "enderecoId" INTEGER NOT NULL,
    "dioceseId" INTEGER NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "paroquia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."etapa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "etapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."tipoEquipe" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoEquipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."localidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,
    "dioceseId" INTEGER NOT NULL,
    "tipoLocalidadeId" INTEGER NOT NULL,
    "observacao" TEXT,
    "enderecoId" INTEGER NOT NULL,

    CONSTRAINT "localidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."tipoLocalidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoLocalidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ambrosio"."roles" NOT NULL DEFAULT 'NAO_IDENTIFICADO',
    "whatsapp" VARCHAR(20),
    "verifiedWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."setor" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "macroRegiaoId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambrosio"."macroRegiao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "macroRegiao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pais_nome_key" ON "ambrosio"."pais"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estado_nome_key" ON "ambrosio"."estado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estado_sigla_key" ON "ambrosio"."estado"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "cidade_nome_key" ON "ambrosio"."cidade"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estadoCivil_descricao_key" ON "ambrosio"."estadoCivil"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "escolaridade_descricao_key" ON "ambrosio"."escolaridade"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "situacaoReligiosa_descricao_key" ON "ambrosio"."situacaoReligiosa"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarismaServico_descricao_key" ON "ambrosio"."tipoCarismaServico"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarismaVinculado_descricao_key" ON "ambrosio"."tipoCarismaVinculado"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarismaPrimitivo_descricao_key" ON "ambrosio"."tipoCarismaPrimitivo"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "pessoaCasal_pessoaMaridoId_pessoaMulherId_key" ON "ambrosio"."pessoaCasal"("pessoaMaridoId", "pessoaMulherId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "ambrosio"."user"("email");

-- AddForeignKey
ALTER TABLE "ambrosio"."estado" ADD CONSTRAINT "estado_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "ambrosio"."pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."cidade" ADD CONSTRAINT "cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "ambrosio"."estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."endereco" ADD CONSTRAINT "endereco_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "ambrosio"."cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoa" ADD CONSTRAINT "pessoa_estadoCivilId_fkey" FOREIGN KEY ("estadoCivilId") REFERENCES "ambrosio"."estadoCivil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoa" ADD CONSTRAINT "pessoa_escolaridadeId_fkey" FOREIGN KEY ("escolaridadeId") REFERENCES "ambrosio"."escolaridade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoa" ADD CONSTRAINT "pessoa_situacaoReligiosaId_fkey" FOREIGN KEY ("situacaoReligiosaId") REFERENCES "ambrosio"."situacaoReligiosa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaServico" ADD CONSTRAINT "pessoaCarismaServico_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaServico" ADD CONSTRAINT "pessoaCarismaServico_tipoCarismaServicoId_fkey" FOREIGN KEY ("tipoCarismaServicoId") REFERENCES "ambrosio"."tipoCarismaServico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaVinculado" ADD CONSTRAINT "pessoaCarismaVinculado_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaVinculado" ADD CONSTRAINT "pessoaCarismaVinculado_tipoCarismaVinculadoId_fkey" FOREIGN KEY ("tipoCarismaVinculadoId") REFERENCES "ambrosio"."tipoCarismaVinculado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaPrimitivo" ADD CONSTRAINT "pessoaCarismaPrimitivo_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCarismaPrimitivo" ADD CONSTRAINT "pessoaCarismaPrimitivo_tipoCarismaPrimitivoId_fkey" FOREIGN KEY ("tipoCarismaPrimitivoId") REFERENCES "ambrosio"."tipoCarismaPrimitivo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaEndereco" ADD CONSTRAINT "pessoaEndereco_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "ambrosio"."endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMaridoId_fkey" FOREIGN KEY ("pessoaMaridoId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaCasal" ADD CONSTRAINT "pessoaCasal_pessoaMulherId_fkey" FOREIGN KEY ("pessoaMulherId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."passaportePessoa" ADD CONSTRAINT "passaportePessoa_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."pessoaContato" ADD CONSTRAINT "pessoaContato_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."diocese" ADD CONSTRAINT "diocese_tipoDioceseId_fkey" FOREIGN KEY ("tipoDioceseId") REFERENCES "ambrosio"."tipoDiocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."diocese" ADD CONSTRAINT "diocese_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "ambrosio"."endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."paroquia" ADD CONSTRAINT "paroquia_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "ambrosio"."endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."paroquia" ADD CONSTRAINT "paroquia_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "ambrosio"."diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."localidade" ADD CONSTRAINT "localidade_dioceseId_fkey" FOREIGN KEY ("dioceseId") REFERENCES "ambrosio"."diocese"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."localidade" ADD CONSTRAINT "localidade_tipoLocalidadeId_fkey" FOREIGN KEY ("tipoLocalidadeId") REFERENCES "ambrosio"."tipoLocalidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."localidade" ADD CONSTRAINT "localidade_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "ambrosio"."endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ambrosio"."setor" ADD CONSTRAINT "setor_macroRegiaoId_fkey" FOREIGN KEY ("macroRegiaoId") REFERENCES "ambrosio"."macroRegiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
