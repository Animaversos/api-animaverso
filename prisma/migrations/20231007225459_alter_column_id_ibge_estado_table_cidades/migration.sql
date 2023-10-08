/*
  Warnings:

  - You are about to drop the column `estadoId` on the `cidades` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_ibge]` on the table `cidades` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_ibge` to the `cidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_ibge_estado` to the `cidades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cidades" DROP CONSTRAINT "cidades_estadoId_fkey";

-- AlterTable
ALTER TABLE "cidades" DROP COLUMN "estadoId",
ADD COLUMN     "id_ibge" INTEGER NOT NULL,
ADD COLUMN     "id_ibge_estado" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cidades_id_ibge_key" ON "cidades"("id_ibge");

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_id_ibge_estado_fkey" FOREIGN KEY ("id_ibge_estado") REFERENCES "estados"("id_ibge") ON DELETE RESTRICT ON UPDATE CASCADE;
