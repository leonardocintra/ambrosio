-- CreateTable
CREATE TABLE "tipoEquipe" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoEquipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipeTipoEquipe" (
    "equipeId" INTEGER NOT NULL,
    "tipoEquipeId" INTEGER NOT NULL,

    CONSTRAINT "equipeTipoEquipe_pkey" PRIMARY KEY ("equipeId","tipoEquipeId")
);

-- AddForeignKey
ALTER TABLE "equipeTipoEquipe" ADD CONSTRAINT "equipeTipoEquipe_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipeTipoEquipe" ADD CONSTRAINT "equipeTipoEquipe_tipoEquipeId_fkey" FOREIGN KEY ("tipoEquipeId") REFERENCES "tipoEquipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
