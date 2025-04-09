-- AlterTable
ALTER TABLE "user" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifiedWhatsapp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "whatsapp" VARCHAR(20);
