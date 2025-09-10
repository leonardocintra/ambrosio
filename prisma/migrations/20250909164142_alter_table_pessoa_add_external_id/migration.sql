/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ambrosio"."pessoa" ADD COLUMN     "externalId" VARCHAR(36);

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_externalId_key" ON "ambrosio"."pessoa"("externalId");

-- CreateIndex
CREATE INDEX "pessoa_externalId_idx" ON "ambrosio"."pessoa"("externalId");
