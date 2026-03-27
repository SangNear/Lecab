/*
  Warnings:

  - You are about to drop the column `isMastered` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `words` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,word]` on the table `words` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "words_userId_nextReviewDate_cefrLevel_idx";

-- AlterTable
ALTER TABLE "words" DROP COLUMN "isMastered",
DROP COLUMN "reviewCount",
DROP COLUMN "status",
ALTER COLUMN "cefrLevel" SET DEFAULT 'A1';

-- DropEnum
DROP TYPE "WordStatus";

-- CreateTable
CREATE TABLE "collocations" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "collocation" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collocations_wordId_collocation_key" ON "collocations"("wordId", "collocation");

-- CreateIndex
CREATE INDEX "words_userId_nextReviewDate_idx" ON "words"("userId", "nextReviewDate");

-- CreateIndex
CREATE INDEX "words_cefrLevel_idx" ON "words"("cefrLevel");

-- CreateIndex
CREATE UNIQUE INDEX "words_userId_word_key" ON "words"("userId", "word");

-- AddForeignKey
ALTER TABLE "collocations" ADD CONSTRAINT "collocations_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
