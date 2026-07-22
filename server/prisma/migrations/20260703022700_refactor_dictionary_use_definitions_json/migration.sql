/*
  Warnings:

  - You are about to drop the `Dictionary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Dictionary";

-- CreateTable
CREATE TABLE "dictionary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "definitions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "DictionaryStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dictionary_word_key" ON "dictionary"("word");
