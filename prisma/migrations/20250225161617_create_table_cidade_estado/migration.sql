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

-- CreateIndex
CREATE UNIQUE INDEX "estado_nome_key" ON "estado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estado_sigla_key" ON "estado"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "cidade_nome_key" ON "cidade"("nome");

-- AddForeignKey
ALTER TABLE "estado" ADD CONSTRAINT "estado_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidade" ADD CONSTRAINT "cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
