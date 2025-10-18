/*
  Warnings:

  - You are about to drop the column `setorId` on the `diocese` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ambrosio"."diocese" DROP CONSTRAINT "diocese_setorId_fkey";

-- AlterTable
ALTER TABLE "ambrosio"."diocese" DROP COLUMN "setorId";
