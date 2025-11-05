/*
  Warnings:

  - You are about to drop the column `cpf` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ambrosio"."user" DROP COLUMN "cpf",
DROP COLUMN "name";
