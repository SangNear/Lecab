/*
  Warnings:

  - A unique constraint covering the columns `[userId,word,categoryId]` on the table `words` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "words_userId_word_key";

-- CreateIndex
CREATE UNIQUE INDEX "words_userId_word_categoryId_key" ON "words"("userId", "word", "categoryId");
