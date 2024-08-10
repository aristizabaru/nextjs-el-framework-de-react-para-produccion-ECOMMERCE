/*
  Warnings:

  - You are about to drop the `user_addres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_addres" DROP CONSTRAINT "user_addres_country_id_fkey";

-- DropForeignKey
ALTER TABLE "user_addres" DROP CONSTRAINT "user_addres_user_id_fkey";

-- DropTable
DROP TABLE "user_addres";

-- CreateTable
CREATE TABLE "user_address" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address_aditional" TEXT,
    "postal code" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_address_user_id_key" ON "user_address"("user_id");

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
