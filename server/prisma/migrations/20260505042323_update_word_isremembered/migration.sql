/*
  Warnings:

  - You are about to drop the column `cefrLevel` on the `words` table. All the data in the column will be lost.
  - You are about to drop the `definitions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "definitions" DROP CONSTRAINT "definitions_wordId_fkey";

-- DropIndex
DROP INDEX "words_cefrLevel_idx";

-- AlterTable
ALTER TABLE "words" DROP COLUMN "cefrLevel",
ADD COLUMN     "isRemembered" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "definitions";
