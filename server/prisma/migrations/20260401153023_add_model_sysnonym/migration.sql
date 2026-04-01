-- CreateTable
CREATE TABLE "synonyms" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "synonyms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "synonyms_wordId_idx" ON "synonyms"("wordId");

-- AddForeignKey
ALTER TABLE "synonyms" ADD CONSTRAINT "synonyms_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
