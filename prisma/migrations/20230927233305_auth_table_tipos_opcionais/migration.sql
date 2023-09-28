-- AlterTable
ALTER TABLE "auth_table" ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "recuperaSenhaToken" DROP NOT NULL;
