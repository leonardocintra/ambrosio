/*
  Warnings:

  - Added the required column `enderecoId` to the `diocese` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diocese" ADD COLUMN     "enderecoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;
