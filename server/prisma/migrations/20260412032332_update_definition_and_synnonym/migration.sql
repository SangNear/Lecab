-- AlterTable
ALTER TABLE "Definition" ALTER COLUMN "context" SET DEFAULT '',
ALTER COLUMN "exampleEn" SET DEFAULT '',
ALTER COLUMN "exampleVi" SET DEFAULT '',
ALTER COLUMN "wordId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "synonyms" ALTER COLUMN "wordId" SET DEFAULT '',
ALTER COLUMN "meaningEn" SET DEFAULT '',
ALTER COLUMN "meaningVi" SET DEFAULT '';

-- AlterTable
ALTER TABLE "words" ALTER COLUMN "collocations" SET DEFAULT ARRAY[]::TEXT[];
