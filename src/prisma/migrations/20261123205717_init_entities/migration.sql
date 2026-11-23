-- CreateEnum
CREATE TYPE "PartOfSpeechType" AS ENUM ('NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PRONOUN', 'PREPOSITION', 'CONJUNCTION', 'DETERMINER', 'INTERJECTION', 'AUXILIARY_VERB');

-- CreateEnum
CREATE TYPE "WordLearningStatus" AS ENUM ('NEW', 'RECOGNIZED', 'KNOWN', 'ACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordCategory" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "category" "PartOfSpeechType" NOT NULL,

    CONSTRAINT "WordCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordMeaning" (
    "id" TEXT NOT NULL,
    "wordCategoryId" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,

    CONSTRAINT "WordMeaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordVariation" (
    "id" TEXT NOT NULL,
    "wordCategoryId" TEXT NOT NULL,
    "form" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "translations" TEXT[],

    CONSTRAINT "WordVariation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IrregularVerbForm" (
    "id" TEXT NOT NULL,
    "wordCategoryId" TEXT NOT NULL,
    "pastSimple" TEXT NOT NULL,
    "pastSimpleTranslations" TEXT[],
    "pastParticiple" TEXT NOT NULL,
    "pastParticipleTranslations" TEXT[],

    CONSTRAINT "IrregularVerbForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "status" "WordLearningStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Word_name_key" ON "Word"("name");

-- CreateIndex
CREATE INDEX "Word_name_idx" ON "Word"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WordCategory_wordId_category_key" ON "WordCategory"("wordId", "category");

-- CreateIndex
CREATE INDEX "WordMeaning_wordCategoryId_idx" ON "WordMeaning"("wordCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "WordVariation_wordCategoryId_form_key" ON "WordVariation"("wordCategoryId", "form");

-- CreateIndex
CREATE UNIQUE INDEX "IrregularVerbForm_wordCategoryId_key" ON "IrregularVerbForm"("wordCategoryId");

-- CreateIndex
CREATE INDEX "UserWord_userId_idx" ON "UserWord"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWord_userId_wordId_key" ON "UserWord"("userId", "wordId");

-- AddForeignKey
ALTER TABLE "WordCategory" ADD CONSTRAINT "WordCategory_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordMeaning" ADD CONSTRAINT "WordMeaning_wordCategoryId_fkey" FOREIGN KEY ("wordCategoryId") REFERENCES "WordCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordVariation" ADD CONSTRAINT "WordVariation_wordCategoryId_fkey" FOREIGN KEY ("wordCategoryId") REFERENCES "WordCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IrregularVerbForm" ADD CONSTRAINT "IrregularVerbForm_wordCategoryId_fkey" FOREIGN KEY ("wordCategoryId") REFERENCES "WordCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
