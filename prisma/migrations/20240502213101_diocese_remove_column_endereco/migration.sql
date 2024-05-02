-- DropForeignKey
ALTER TABLE "diocese" DROP CONSTRAINT "diocese_enderecoId_fkey";

-- AlterTable
ALTER TABLE "diocese" ALTER COLUMN "enderecoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
