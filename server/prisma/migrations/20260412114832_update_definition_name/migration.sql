/*
  Warnings:

  - You are about to drop the `Definition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Definition" DROP CONSTRAINT "Definition_wordId_fkey";

-- DropTable
DROP TABLE "Definition";

-- CreateTable
CREATE TABLE "definitions" (
    "id" TEXT NOT NULL,
    "context" TEXT NOT NULL DEFAULT '',
    "exampleEn" TEXT NOT NULL DEFAULT '',
    "exampleVi" TEXT NOT NULL DEFAULT '',
    "wordId" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "definitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "definitions" ADD CONSTRAINT "definitions_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
