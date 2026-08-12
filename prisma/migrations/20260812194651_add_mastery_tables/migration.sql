-- CreateTable
CREATE TABLE "GameMastery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameContentId" TEXT NOT NULL,
    "masteredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GameMastery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameMastery_gameContentId_fkey" FOREIGN KEY ("gameContentId") REFERENCES "GameContent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScenarioMastery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "masteredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ScenarioMastery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ScenarioMastery_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ScenarioQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "GameMastery_userId_idx" ON "GameMastery"("userId");

-- CreateIndex
CREATE INDEX "GameMastery_gameContentId_idx" ON "GameMastery"("gameContentId");

-- CreateIndex
CREATE UNIQUE INDEX "GameMastery_userId_gameContentId_key" ON "GameMastery"("userId", "gameContentId");

-- CreateIndex
CREATE INDEX "ScenarioMastery_userId_idx" ON "ScenarioMastery"("userId");

-- CreateIndex
CREATE INDEX "ScenarioMastery_questionId_idx" ON "ScenarioMastery"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "ScenarioMastery_userId_questionId_key" ON "ScenarioMastery"("userId", "questionId");
