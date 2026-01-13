-- AlterTable
ALTER TABLE "ambrosio"."comunidadeEtapa" ADD COLUMN     "equipeId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "ambrosio"."comunidadeEtapa" ADD CONSTRAINT "comunidadeEtapa_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "ambrosio"."equipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;