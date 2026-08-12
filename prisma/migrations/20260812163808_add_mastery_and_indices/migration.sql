-- CreateTable
CREATE TABLE "MasteredQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "masteredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MasteredQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MasteredQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ScenarioQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "MasteredQuestion_userId_idx" ON "MasteredQuestion"("userId");

-- CreateIndex
CREATE INDEX "MasteredQuestion_questionId_idx" ON "MasteredQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "MasteredQuestion_userId_questionId_key" ON "MasteredQuestion"("userId", "questionId");

-- CreateIndex
CREATE INDEX "Badge_profileId_idx" ON "Badge"("profileId");

-- CreateIndex
CREATE INDEX "Feedback_userId_idx" ON "Feedback"("userId");

-- CreateIndex
CREATE INDEX "GameSession_userId_idx" ON "GameSession"("userId");

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_idx" ON "QuizAttempt"("userId");

-- CreateIndex
CREATE INDEX "QuizAttempt_questionId_idx" ON "QuizAttempt"("questionId");
