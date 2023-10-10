/*
  Warnings:

  - You are about to drop the column `cep` on the `usuario_endereco` table. All the data in the column will be lost.
  - You are about to drop the column `localidade` on the `usuario_endereco` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `usuario_endereco` table. All the data in the column will be lost.
  - Added the required column `cidadeId` to the `usuario_endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estadoId` to the `usuario_endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario_endereco" DROP COLUMN "cep",
DROP COLUMN "localidade",
DROP COLUMN "uf",
ADD COLUMN     "cidadeId" INTEGER NOT NULL,
ADD COLUMN     "estadoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario_endereco" ADD CONSTRAINT "usuario_endereco_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_endereco" ADD CONSTRAINT "usuario_endereco_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
