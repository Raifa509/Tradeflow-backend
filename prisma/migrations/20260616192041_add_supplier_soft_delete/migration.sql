-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reason" TEXT;
