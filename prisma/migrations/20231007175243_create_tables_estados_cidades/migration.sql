-- CreateTable
CREATE TABLE "estados" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
