/*
  Warnings:

  - You are about to drop the `Interessados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interessados" DROP CONSTRAINT "Interessados_id_pet_fkey";

-- DropForeignKey
ALTER TABLE "Interessados" DROP CONSTRAINT "Interessados_id_usuario_fkey";

-- DropTable
DROP TABLE "Interessados";

-- CreateTable
CREATE TABLE "interessados" (
    "id" SERIAL NOT NULL,
    "id_pet" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "interessados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "interessados" ADD CONSTRAINT "interessados_id_pet_fkey" FOREIGN KEY ("id_pet") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interessados" ADD CONSTRAINT "interessados_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
