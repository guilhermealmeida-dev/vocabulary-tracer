/*
  Warnings:

  - A unique constraint covering the columns `[wordCategoryId,meaning]` on the table `WordMeaning` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WordMeaning_wordCategoryId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "WordMeaning_wordCategoryId_meaning_key" ON "WordMeaning"("wordCategoryId", "meaning");
