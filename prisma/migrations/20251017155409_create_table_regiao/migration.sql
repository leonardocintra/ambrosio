-- CreateTable
CREATE TABLE "ambrosio"."regiao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "macroRegiaoId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "regiao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regiao_descricao_key" ON "ambrosio"."regiao"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "regiao_descricao_macroRegiaoId_key" ON "ambrosio"."regiao"("descricao", "macroRegiaoId");

-- AddForeignKey
ALTER TABLE "ambrosio"."regiao" ADD CONSTRAINT "regiao_macroRegiaoId_fkey" FOREIGN KEY ("macroRegiaoId") REFERENCES "ambrosio"."macroRegiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
