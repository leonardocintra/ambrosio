/*
  Warnings:

  - You are about to drop the column `UF` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `endereco` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "UF",
DROP COLUMN "cidade",
DROP COLUMN "pais",
ADD COLUMN     "cidadeId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
