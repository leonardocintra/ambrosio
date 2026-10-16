/*
  Warnings:

  - You are about to drop the column `capital` on the `pais` table. All the data in the column will be lost.
  - You are about to drop the column `isoAlpha2` on the `pais` table. All the data in the column will be lost.
  - You are about to drop the column `lingua` on the `pais` table. All the data in the column will be lost.
  - You are about to drop the column `regiao` on the `pais` table. All the data in the column will be lost.
  - You are about to drop the column `regiaoIntermediaria` on the `pais` table. All the data in the column will be lost.
  - You are about to drop the column `subRegiao` on the `pais` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pais" DROP COLUMN "capital",
DROP COLUMN "isoAlpha2",
DROP COLUMN "lingua",
DROP COLUMN "regiao",
DROP COLUMN "regiaoIntermediaria",
DROP COLUMN "subRegiao";
