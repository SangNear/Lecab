/*
  Warnings:

  - You are about to drop the column `isRemembered` on the `words` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WordStatus" AS ENUM ('UNREVIEWED', 'REMEMBERED', 'FORGOTTEN');

-- AlterTable
ALTER TABLE "words" DROP COLUMN "isRemembered",
ADD COLUMN     "status" "WordStatus" NOT NULL DEFAULT 'UNREVIEWED';
