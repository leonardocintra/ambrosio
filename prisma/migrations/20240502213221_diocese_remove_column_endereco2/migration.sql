/*
  Warnings:

  - You are about to drop the column `enderecoId` on the `diocese` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "diocese" DROP CONSTRAINT "diocese_enderecoId_fkey";

-- AlterTable
ALTER TABLE "diocese" DROP COLUMN "enderecoId";
