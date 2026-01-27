-- AlterTable
ALTER TABLE "ambrosio"."user" ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
