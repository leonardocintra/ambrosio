-- AlterTable
ALTER TABLE "ambrosio"."paroquia" ADD COLUMN     "setorId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "ambrosio"."paroquia" ADD CONSTRAINT "paroquia_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "ambrosio"."setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
