/*
  Warnings:

  - You are about to drop the column `address_aditional` on the `user_address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_address" DROP COLUMN "address_aditional",
ADD COLUMN     "additional_address" TEXT;
