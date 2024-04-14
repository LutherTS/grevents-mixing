-- AlterTable
ALTER TABLE "Contact" ADD COLUMN "pinnedByFriendAt" DATETIME;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
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
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pinnedFriendId" TEXT,
    CONSTRAINT "User_pinnedFriendId_fkey" FOREIGN KEY ("pinnedFriendId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("appWideName", "createdAt", "email", "friendCode", "hashedPassword", "id", "state", "statusDashboard", "statusPersonalInfo", "statusTitle", "updatedAt", "username") SELECT "appWideName", "createdAt", "email", "friendCode", "hashedPassword", "id", "state", "statusDashboard", "statusPersonalInfo", "statusTitle", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_friendCode_key" ON "User"("friendCode");
CREATE UNIQUE INDEX "User_pinnedFriendId_key" ON "User"("pinnedFriendId");
CREATE TABLE "new_UserQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "kind" TEXT NOT NULL DEFAULT 'NONE',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isPinnedForSelf" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pinnedAt" DATETIME,
    "pinnedForSelfAt" DATETIME,
    "upToIrlAt" DATETIME,
    "downFromIrlAt" DATETIME,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "UserQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserQuestion" ("createdAt", "downFromIrlAt", "id", "isPinned", "kind", "pinnedAt", "questionId", "state", "upToIrlAt", "updatedAt", "userId") SELECT "createdAt", "downFromIrlAt", "id", "isPinned", "kind", "pinnedAt", "questionId", "state", "upToIrlAt", "updatedAt", "userId" FROM "UserQuestion";
DROP TABLE "UserQuestion";
ALTER TABLE "new_UserQuestion" RENAME TO "UserQuestion";
CREATE UNIQUE INDEX "UserQuestion_userId_questionId_key" ON "UserQuestion"("userId", "questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
