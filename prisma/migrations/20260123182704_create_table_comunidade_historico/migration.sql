-- CreateTable
CREATE TABLE "comunidadeHistorico" (
    "id" SERIAL NOT NULL,
    "comunidadeId" INTEGER NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comunidadeHistorico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comunidadeHistorico" ADD CONSTRAINT "comunidadeHistorico_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "comunidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
