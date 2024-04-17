/*
  Warnings:

  - You are about to alter the column `descricao` on the `escolaridade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - You are about to alter the column `descricao` on the `tipoCarisma` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - A unique constraint covering the columns `[descricao]` on the table `tipoCarisma` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "escolaridade" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "tipoCarisma" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "tipoCarisma_descricao_key" ON "tipoCarisma"("descricao");
