import { Prisma } from "@prisma/client";

export function dataUpdateUserQuestionFriendCancelSharedToFriend(): Prisma.UserQuestionFriendUpdateInput {
  return {
    isSharedToFriend: false,
    sharedToFriendAt: null,
    contact: {
      update: {
        userFirst: {
          update: {
            statusPersonalInfo: "USERQUESTIONFRIENDUNSHARED",
          },
        },
      },
    },
  };
}

export function dataUpdateUserQuestionFriendCancelPinnedByFriend(): Prisma.UserQuestionFriendUpdateInput {
  return {
    isPinnedByFriend: false,
    pinnedByFriendAt: null,
    contact: {
      update: {
        userFirst: {
          update: {
            statusPersonalInfo: "USERQUESTIONFRIENDUNPINNED",
          },
        },
      },
    },
  };
}
