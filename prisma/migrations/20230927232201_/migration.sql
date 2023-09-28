/*
  Warnings:

  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_usuarioId_fkey";

-- DropTable
DROP TABLE "refresh_token";

-- CreateTable
CREATE TABLE "auth_table" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "recuperaSenhaToken" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "auth_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_table_usuarioId_key" ON "auth_table"("usuarioId");

-- AddForeignKey
ALTER TABLE "auth_table" ADD CONSTRAINT "auth_table_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
