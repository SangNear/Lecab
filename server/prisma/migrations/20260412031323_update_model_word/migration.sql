/*
  Warnings:

  - You are about to drop the column `data` on the `synonyms` table. All the data in the column will be lost.
  - You are about to drop the `collocations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `meaningEn` to the `synonyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meaningVi` to the `synonyms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collocations" DROP CONSTRAINT "collocations_wordId_fkey";

-- AlterTable
ALTER TABLE "synonyms" DROP COLUMN "data",
ADD COLUMN     "meaningEn" TEXT NOT NULL,
ADD COLUMN     "meaningVi" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "words" ADD COLUMN     "collocations" TEXT[];

-- DropTable
DROP TABLE "collocations";

-- CreateTable
CREATE TABLE "Definition" (
    "id" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "exampleEn" TEXT NOT NULL,
    "exampleVi" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
