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
        statusOtherProfile: "USERQUESTIONFRIENDUNPINNED",
      },
    },
  };
}

export function dataUpdateUserQuestionFriendRePinnedByFriend(): Prisma.UserQuestionFriendUpdateInput {
  return {
    isPinnedByFriend: true,
    pinnedByFriendAt: new Date(),
    contact: {
      update: {
        statusOtherProfile: "USERQUESTIONFRIENDREPINNED",
      },
    },
  };
}
