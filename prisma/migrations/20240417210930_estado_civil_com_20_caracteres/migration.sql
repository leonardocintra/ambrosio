/*
  Warnings:

  - You are about to alter the column `descricao` on the `estadoCivil` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "estadoCivil" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(20);
