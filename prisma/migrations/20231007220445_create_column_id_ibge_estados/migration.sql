/*
  Warnings:

  - A unique constraint covering the columns `[id_ibge]` on the table `estados` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_ibge` to the `estados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estados" ADD COLUMN     "id_ibge" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "estados_id_ibge_key" ON "estados"("id_ibge");
