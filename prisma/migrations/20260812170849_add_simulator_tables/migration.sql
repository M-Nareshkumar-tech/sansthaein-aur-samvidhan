-- CreateTable
CREATE TABLE "SimulatorPath" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "levelRequired" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SimulatorScenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pathId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionHi" TEXT NOT NULL,
    "descriptionTa" TEXT NOT NULL,
    "articleLinked" TEXT NOT NULL,
    CONSTRAINT "SimulatorScenario_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "SimulatorPath" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SimulatorOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scenarioId" TEXT NOT NULL,
    "optionIndex" INTEGER NOT NULL,
    "textEn" TEXT NOT NULL,
    "textHi" TEXT NOT NULL,
    "textTa" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "explanationEn" TEXT NOT NULL,
    "explanationHi" TEXT NOT NULL,
    "explanationTa" TEXT NOT NULL,
    CONSTRAINT "SimulatorOption_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "SimulatorScenario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SimulatorAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "chosenIndex" INTEGER NOT NULL,
    "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SimulatorAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SimulatorAttempt_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "SimulatorScenario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MasteredScenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "masteredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MasteredScenario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MasteredScenario_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "SimulatorScenario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "SimulatorScenario_pathId_idx" ON "SimulatorScenario"("pathId");

-- CreateIndex
CREATE INDEX "SimulatorOption_scenarioId_idx" ON "SimulatorOption"("scenarioId");

-- CreateIndex
CREATE UNIQUE INDEX "SimulatorOption_scenarioId_optionIndex_key" ON "SimulatorOption"("scenarioId", "optionIndex");

-- CreateIndex
CREATE INDEX "SimulatorAttempt_userId_idx" ON "SimulatorAttempt"("userId");

-- CreateIndex
CREATE INDEX "SimulatorAttempt_scenarioId_idx" ON "SimulatorAttempt"("scenarioId");

-- CreateIndex
CREATE INDEX "MasteredScenario_userId_idx" ON "MasteredScenario"("userId");

-- CreateIndex
CREATE INDEX "MasteredScenario_scenarioId_idx" ON "MasteredScenario"("scenarioId");

-- CreateIndex
CREATE UNIQUE INDEX "MasteredScenario_userId_scenarioId_key" ON "MasteredScenario"("userId", "scenarioId");
