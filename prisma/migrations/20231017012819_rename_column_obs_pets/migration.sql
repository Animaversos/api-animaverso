/*
  Warnings:

  - You are about to drop the column `Observacao` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "Observacao",
ADD COLUMN     "observacao" TEXT;
