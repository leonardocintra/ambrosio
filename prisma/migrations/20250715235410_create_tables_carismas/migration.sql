-- CreateTable
CREATE TABLE "tipoCarismaServico" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoCarismaServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoCarismaVinculado" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoCarismaVinculado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoCarismaPrimitivo" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoCarismaPrimitivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoaCarismaServico" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaServicoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarismaServico_pkey" PRIMARY KEY ("pessoaId","tipoCarismaServicoId")
);

-- CreateTable
CREATE TABLE "pessoaCarismaVinculado" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaVinculadoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarismaVinculado_pkey" PRIMARY KEY ("pessoaId","tipoCarismaVinculadoId")
);

-- CreateTable
CREATE TABLE "pessoaCarismaPrimitivo" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaPrimitivoId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarismaPrimitivo_pkey" PRIMARY KEY ("pessoaId","tipoCarismaPrimitivoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarismaServico_descricao_key" ON "tipoCarismaServico"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarismaVinculado_descricao_key" ON "tipoCarismaVinculado"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarismaPrimitivo_descricao_key" ON "tipoCarismaPrimitivo"("descricao");

-- AddForeignKey
ALTER TABLE "pessoaCarismaServico" ADD CONSTRAINT "pessoaCarismaServico_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarismaServico" ADD CONSTRAINT "pessoaCarismaServico_tipoCarismaServicoId_fkey" FOREIGN KEY ("tipoCarismaServicoId") REFERENCES "tipoCarismaServico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarismaVinculado" ADD CONSTRAINT "pessoaCarismaVinculado_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarismaVinculado" ADD CONSTRAINT "pessoaCarismaVinculado_tipoCarismaVinculadoId_fkey" FOREIGN KEY ("tipoCarismaVinculadoId") REFERENCES "tipoCarismaVinculado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarismaPrimitivo" ADD CONSTRAINT "pessoaCarismaPrimitivo_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarismaPrimitivo" ADD CONSTRAINT "pessoaCarismaPrimitivo_tipoCarismaPrimitivoId_fkey" FOREIGN KEY ("tipoCarismaPrimitivoId") REFERENCES "tipoCarismaPrimitivo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
