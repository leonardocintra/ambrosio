/*
  Warnings:

  - You are about to drop the column `continente` on the `pais` table. All the data in the column will be lost.
  - Added the required column `capital` to the `pais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isoAlpha2` to the `pais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lingua` to the `pais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regiao` to the `pais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subRegiao` to the `pais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pais" DROP COLUMN "continente",
ADD COLUMN     "capital" VARCHAR(100) NOT NULL,
ADD COLUMN     "isoAlpha2" VARCHAR(2) NOT NULL,
ADD COLUMN     "lingua" VARCHAR(50) NOT NULL,
ADD COLUMN     "regiao" VARCHAR(100) NOT NULL,
ADD COLUMN     "regiaoIntermediaria" VARCHAR(100),
ADD COLUMN     "subRegiao" VARCHAR(100) NOT NULL;

-- DropEnum
DROP TYPE "Continente";
