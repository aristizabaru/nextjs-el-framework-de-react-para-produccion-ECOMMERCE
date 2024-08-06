/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "product_image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "product_id" TEXT,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "cateogory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
