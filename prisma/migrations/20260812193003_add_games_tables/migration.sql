-- CreateTable
CREATE TABLE "GameContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameType" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionHi" TEXT NOT NULL,
    "descriptionTa" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "questionHi" TEXT NOT NULL,
    "questionTa" TEXT NOT NULL,
    "optionsEn" TEXT NOT NULL,
    "optionsHi" TEXT NOT NULL,
    "optionsTa" TEXT NOT NULL,
    "correctAnswerIdx" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "explanationEn" TEXT NOT NULL,
    "explanationHi" TEXT NOT NULL,
    "explanationTa" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameContentId" TEXT NOT NULL,
    "chosenIdx" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GameAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameAttempt_gameContentId_fkey" FOREIGN KEY ("gameContentId") REFERENCES "GameContent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "GameContent_gameType_idx" ON "GameContent"("gameType");

-- CreateIndex
CREATE UNIQUE INDEX "GameContent_gameType_identifier_key" ON "GameContent"("gameType", "identifier");

-- CreateIndex
CREATE INDEX "GameAttempt_userId_idx" ON "GameAttempt"("userId");

-- CreateIndex
CREATE INDEX "GameAttempt_gameContentId_idx" ON "GameAttempt"("gameContentId");
