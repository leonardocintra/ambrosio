-- CreateTable
CREATE TABLE "usuarioParoquia" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "paroquiaId" INTEGER NOT NULL,

    CONSTRAINT "usuarioParoquia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarioParoquia_userId_paroquiaId_key" ON "usuarioParoquia"("userId", "paroquiaId");

-- AddForeignKey
ALTER TABLE "usuarioParoquia" ADD CONSTRAINT "usuarioParoquia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioParoquia" ADD CONSTRAINT "usuarioParoquia_paroquiaId_fkey" FOREIGN KEY ("paroquiaId") REFERENCES "paroquia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
