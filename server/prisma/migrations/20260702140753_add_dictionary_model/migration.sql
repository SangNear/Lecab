-- CreateEnum
CREATE TYPE "DictionaryStatus" AS ENUM ('PENDING', 'READY', 'FAIL');

-- CreateTable
CREATE TABLE "Dictionary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example" TEXT[],
    "pronunciation" TEXT,
    "collocations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "synonyms" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "DictionaryStatus" NOT NULL DEFAULT 'READY',

    CONSTRAINT "Dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dictionary_word_idx" ON "Dictionary"("word");
