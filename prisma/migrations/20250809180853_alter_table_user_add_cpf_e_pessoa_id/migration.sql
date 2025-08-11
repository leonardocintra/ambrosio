-- AlterTable
ALTER TABLE "ambrosio"."user" ADD COLUMN     "cpf" VARCHAR(11),
ADD COLUMN     "pessoaId" INTEGER;

-- AddForeignKey
ALTER TABLE "ambrosio"."user" ADD CONSTRAINT "user_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "ambrosio"."pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
