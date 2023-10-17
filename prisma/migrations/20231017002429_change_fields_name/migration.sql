/*
  Warnings:

  - You are about to drop the column `recuperaSenhaToken` on the `auth_table` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `auth_table` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `auth_table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_usuario]` on the table `auth_table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_usuario` to the `auth_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "auth_table" DROP CONSTRAINT "auth_table_usuarioId_fkey";

-- DropIndex
DROP INDEX "auth_table_usuarioId_key";

-- AlterTable
ALTER TABLE "auth_table" DROP COLUMN "recuperaSenhaToken",
DROP COLUMN "refreshToken",
DROP COLUMN "usuarioId",
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ADD COLUMN     "recupera_senha_token" TEXT,
ADD COLUMN     "refresh_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "auth_table_id_usuario_key" ON "auth_table"("id_usuario");

-- AddForeignKey
ALTER TABLE "auth_table" ADD CONSTRAINT "auth_table_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
