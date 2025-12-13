-- CreateTable
CREATE TABLE "ambrosio"."comunidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80),
    "numeroDaComunidade" INTEGER NOT NULL,
    "paroquiaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comunidade_numeroDaComunidade_paroquiaId_key" ON "ambrosio"."comunidade"("numeroDaComunidade", "paroquiaId");

-- AddForeignKey
ALTER TABLE "ambrosio"."comunidade" ADD CONSTRAINT "comunidade_paroquiaId_fkey" FOREIGN KEY ("paroquiaId") REFERENCES "ambrosio"."paroquia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
