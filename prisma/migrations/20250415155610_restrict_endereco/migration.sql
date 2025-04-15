-- DropForeignKey
ALTER TABLE "diocese" DROP CONSTRAINT "diocese_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "paroquia" DROP CONSTRAINT "paroquia_enderecoId_fkey";

-- AddForeignKey
ALTER TABLE "diocese" ADD CONSTRAINT "diocese_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paroquia" ADD CONSTRAINT "paroquia_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
