-- CreateEnum
CREATE TYPE "Continente" AS ENUM ('AFRICA', 'AMERICA_DO_NORTE', 'AMERICA_DO_SUL', 'ANTARTIDA', 'ASIA', 'EUROPA', 'OCEANIA');

-- CreateTable
CREATE TABLE "pais" (
    "id" SERIAL NOT NULL,
    "continente" "Continente" NOT NULL DEFAULT 'AMERICA_DO_SUL',
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "pais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pais_nome_key" ON "pais"("nome");
