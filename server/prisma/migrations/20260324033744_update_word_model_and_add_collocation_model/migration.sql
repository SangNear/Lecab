/*
  Warnings:

  - The `example` column on the `words` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `cefrLevel` to the `words` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CefrLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "WordStatus" AS ENUM ('new', 'learning', 'reviewing', 'mastered');

-- DropIndex
DROP INDEX "words_userId_nextReviewDate_idx";

-- AlterTable
ALTER TABLE "words" ADD COLUMN     "cefrLevel" "CefrLevel" NOT NULL,
ADD COLUMN     "correctCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastReviewedAt" TIMESTAMP(3),
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "WordStatus" NOT NULL DEFAULT 'new',
ADD COLUMN     "wrongCount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "example",
ADD COLUMN     "example" TEXT[];

-- CreateIndex
CREATE INDEX "words_userId_nextReviewDate_cefrLevel_idx" ON "words"("userId", "nextReviewDate", "cefrLevel");
