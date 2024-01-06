-- CreateEnum
CREATE TYPE "SimNao" AS ENUM ('SIM', 'NAO');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "adotado" "SimNao" NOT NULL DEFAULT 'NAO';
