/*
  Warnings:

  - Added the required column `regiaoId` to the `diocese` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diocese" ADD COLUMN     "regiaoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_regiaoId_fkey" FOREIGN KEY ("regiaoId") REFERENCES "regioesCaminho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
