/*
  Warnings:

  - You are about to drop the `synonyms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "synonyms" DROP CONSTRAINT "synonyms_wordId_fkey";

-- AlterTable
ALTER TABLE "words" ADD COLUMN     "synonyms" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "synonyms";
