-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserQuestionFriend" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT 'NONE',
    "isSharedToFriend" BOOLEAN NOT NULL DEFAULT false,
    "isPinnedByFriend" BOOLEAN NOT NULL DEFAULT false,
    "isPinnedOfFriends" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sharedToFriendAt" DATETIME,
    "pinnedByFriendAt" DATETIME,
    "pinnedOfFriendsAt" DATETIME,
    "userQuestionId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    CONSTRAINT "UserQuestionFriend_userQuestionId_fkey" FOREIGN KEY ("userQuestionId") REFERENCES "UserQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserQuestionFriend_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserQuestionFriend" ("contactId", "createdAt", "id", "isPinnedByFriend", "isSharedToFriend", "pinnedByFriendAt", "sharedToFriendAt", "state", "updatedAt", "userQuestionId") SELECT "contactId", "createdAt", "id", "isPinnedByFriend", "isSharedToFriend", "pinnedByFriendAt", "sharedToFriendAt", "state", "updatedAt", "userQuestionId" FROM "UserQuestionFriend";
DROP TABLE "UserQuestionFriend";
ALTER TABLE "new_UserQuestionFriend" RENAME TO "UserQuestionFriend";
CREATE UNIQUE INDEX "UserQuestionFriend_userQuestionId_contactId_key" ON "UserQuestionFriend"("userQuestionId", "contactId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
