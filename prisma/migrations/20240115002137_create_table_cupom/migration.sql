-- CreateTable
CREATE TABLE "cupom" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "id_pet" INTEGER NOT NULL,

    CONSTRAINT "cupom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cupom_codigo_key" ON "cupom"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cupom_id_pet_key" ON "cupom"("id_pet");

-- AddForeignKey
ALTER TABLE "cupom" ADD CONSTRAINT "cupom_id_pet_fkey" FOREIGN KEY ("id_pet") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
