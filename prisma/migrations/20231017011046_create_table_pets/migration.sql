-- CreateEnum
CREATE TYPE "Idade" AS ENUM ('ZERO_A_SEIS_MESES', 'SEIS_MESES_A_UM_ANO', 'UM_A_DOIS_ANOS', 'DOIS_A_CINCO_ANOS');

-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('CACHORRO', 'GATO', 'OUTROS');

-- CreateEnum
CREATE TYPE "Porte" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" "Especie" NOT NULL,
    "idade" "Idade" NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "porte" "Porte" NOT NULL,
    "genero" "Genero" NOT NULL,
    "Observacao" TEXT,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pets_id_usuario_key" ON "pets"("id_usuario");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
