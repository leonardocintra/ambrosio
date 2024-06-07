-- CreateTable
CREATE TABLE "pessoaCarisma" (
    "pessoaId" INTEGER NOT NULL,
    "tipoCarismaId" INTEGER NOT NULL,

    CONSTRAINT "pessoaCarisma_pkey" PRIMARY KEY ("pessoaId","tipoCarismaId")
);

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoaCarisma" ADD CONSTRAINT "pessoaCarisma_tipoCarismaId_fkey" FOREIGN KEY ("tipoCarismaId") REFERENCES "tipoCarisma"("id") ON DELETE CASCADE ON UPDATE CASCADE;
