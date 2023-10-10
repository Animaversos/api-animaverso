/*
  Warnings:

  - You are about to drop the column `cidadeId` on the `usuario_endereco` table. All the data in the column will be lost.
  - You are about to drop the column `estadoId` on the `usuario_endereco` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `usuario_endereco` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_usuario]` on the table `usuario_endereco` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_cidade` to the `usuario_endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_estado` to the `usuario_endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `usuario_endereco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "usuario_endereco" DROP CONSTRAINT "usuario_endereco_cidadeId_fkey";

-- DropForeignKey
ALTER TABLE "usuario_endereco" DROP CONSTRAINT "usuario_endereco_estadoId_fkey";

-- DropForeignKey
ALTER TABLE "usuario_endereco" DROP CONSTRAINT "usuario_endereco_usuarioId_fkey";

-- DropIndex
DROP INDEX "usuario_endereco_usuarioId_key";

-- AlterTable
ALTER TABLE "usuario_endereco" DROP COLUMN "cidadeId",
DROP COLUMN "estadoId",
DROP COLUMN "usuarioId",
ADD COLUMN     "id_cidade" INTEGER NOT NULL,
ADD COLUMN     "id_estado" INTEGER NOT NULL,
ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_endereco_id_usuario_key" ON "usuario_endereco"("id_usuario");

-- AddForeignKey
ALTER TABLE "usuario_endereco" ADD CONSTRAINT "usuario_endereco_id_cidade_fkey" FOREIGN KEY ("id_cidade") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_endereco" ADD CONSTRAINT "usuario_endereco_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_endereco" ADD CONSTRAINT "usuario_endereco_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
