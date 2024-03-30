-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "statusTitle" TEXT NOT NULL DEFAULT 'NONE',
    "statusDashboard" TEXT NOT NULL DEFAULT 'NONE',
    "statusPersonalInfo" TEXT NOT NULL DEFAULT 'NONE',
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "appWideName" TEXT NOT NULL,
    "friendCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "kind" TEXT NOT NULL DEFAULT 'NONE',
    "processRelationship" TEXT NOT NULL DEFAULT 'NONE',
    "statusOtherProfile" TEXT NOT NULL DEFAULT 'NONE',
    "statusRelationship" TEXT NOT NULL DEFAULT 'NONE',
    "blocking" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentFriendAt" DATETIME,
    "sentIrlAt" DATETIME,
    "annulFriendAt" DATETIME,
    "annulIrlAt" DATETIME,
    "friendAt" DATETIME,
    "irlAt" DATETIME,
    "blockedAt" DATETIME,
    "latestfoundAt" DATETIME,
    "mirrorId" TEXT,
    "userFirstId" TEXT NOT NULL,
    "userLastId" TEXT NOT NULL,
    CONSTRAINT "Contact_mirrorId_fkey" FOREIGN KEY ("mirrorId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Contact_userFirstId_fkey" FOREIGN KEY ("userFirstId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contact_userLastId_fkey" FOREIGN KEY ("userLastId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "kind" TEXT NOT NULL DEFAULT 'NONE',
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "kind" TEXT NOT NULL DEFAULT 'NONE',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pinnedAt" DATETIME,
    "upToIrlAt" DATETIME,
    "downFromIrlAt" DATETIME,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "UserQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserQuestionFriend" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "isSharedToFriend" BOOLEAN NOT NULL DEFAULT false,
    "isPinnedByFriend" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sharedToFriendAt" DATETIME,
    "pinnedByFriendAt" DATETIME,
    "userQuestionId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    CONSTRAINT "UserQuestionFriend_userQuestionId_fkey" FOREIGN KEY ("userQuestionId") REFERENCES "UserQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserQuestionFriend_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userQuestionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Answer_userQuestionId_fkey" FOREIGN KEY ("userQuestionId") REFERENCES "UserQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_friendCode_key" ON "User"("friendCode");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_mirrorId_key" ON "Contact"("mirrorId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userFirstId_userLastId_key" ON "Contact"("userFirstId", "userLastId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_kind_name_key" ON "Question"("kind", "name");

-- CreateIndex
CREATE UNIQUE INDEX "UserQuestion_userId_questionId_key" ON "UserQuestion"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserQuestionFriend_userQuestionId_contactId_key" ON "UserQuestionFriend"("userQuestionId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_userQuestionId_key" ON "Answer"("userQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_userQuestionId_userId_key" ON "Answer"("userQuestionId", "userId");
