/*
  Warnings:

  - You are about to drop the column `macroRegiaoId` on the `setor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descricao]` on the table `setor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descricao,regiaoId]` on the table `setor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ambrosio"."setor" DROP CONSTRAINT "setor_macroRegiaoId_fkey";

-- AlterTable
ALTER TABLE "ambrosio"."setor" DROP COLUMN "macroRegiaoId",
ADD COLUMN     "regiaoId" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "setor_descricao_key" ON "ambrosio"."setor"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "setor_descricao_regiaoId_key" ON "ambrosio"."setor"("descricao", "regiaoId");

-- AddForeignKey
ALTER TABLE "ambrosio"."setor" ADD CONSTRAINT "setor_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "ambrosio"."regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
