/*
  Warnings:

  - A unique constraint covering the columns `[refNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refNumber]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refNumber]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refNumber]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refNumber]` on the table `SalesOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refNumber]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refNumber` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refNumber` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refNumber` to the `SalesOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refNumber` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "refNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "refNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "refNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "refNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesOrder" ADD COLUMN     "refNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "refNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_refNumber_key" ON "Customer"("refNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_refNumber_key" ON "Invoice"("refNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Product_refNumber_key" ON "Product"("refNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_refNumber_key" ON "PurchaseOrder"("refNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SalesOrder_refNumber_key" ON "SalesOrder"("refNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_refNumber_key" ON "Supplier"("refNumber");
