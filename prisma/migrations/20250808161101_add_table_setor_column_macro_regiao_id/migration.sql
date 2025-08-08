/*
  Warnings:

  - Added the required column `macroRegiaoId` to the `setor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ambrosio"."setor" ADD COLUMN     "macroRegiaoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ambrosio"."setor" ADD CONSTRAINT "setor_macroRegiaoId_fkey" FOREIGN KEY ("macroRegiaoId") REFERENCES "ambrosio"."macroRegiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
