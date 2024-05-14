/*
  Warnings:

  - You are about to drop the column `tipoDioceseId` on the `localidade` table. All the data in the column will be lost.
  - Added the required column `tipoLocalidadeId` to the `localidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "localidade" DROP CONSTRAINT "localidade_tipoDioceseId_fkey";

-- AlterTable
ALTER TABLE "localidade" DROP COLUMN "tipoDioceseId",
ADD COLUMN     "tipoLocalidadeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tipoLocalidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80) NOT NULL,

    CONSTRAINT "tipoLocalidade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "localidade" ADD CONSTRAINT "localidade_tipoLocalidadeId_fkey" FOREIGN KEY ("tipoLocalidadeId") REFERENCES "tipoLocalidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- insert DATA
insert into "tipoLocalidade" (descricao) values ('Paróquia');
insert into "tipoLocalidade" (descricao) values ('Centro Neocatecumenal');
insert into "tipoLocalidade" (descricao) values ('Seminário');
insert into "tipoLocalidade" (descricao) values ('Convento');
insert into "tipoLocalidade" (descricao) values ('Casa de Convivência');
