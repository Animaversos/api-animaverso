-- CreateTable
CREATE TABLE "Interessados" (
    "id" SERIAL NOT NULL,
    "id_pet" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Interessados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interessados" ADD CONSTRAINT "Interessados_id_pet_fkey" FOREIGN KEY ("id_pet") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interessados" ADD CONSTRAINT "Interessados_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
