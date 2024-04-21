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

export function dataUpdateUserQuestionFriendCancelPinnedByFriendProfile(): Prisma.UserQuestionFriendUpdateInput {
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

export function dataUpdateUserQuestionFriendCancelPinnedByFriendDashboard(): Prisma.UserQuestionFriendUpdateInput {
  return {
    isPinnedByFriend: false,
    pinnedByFriendAt: null,
    contact: {
      update: {
        userLast: {
          update: {
            statusDashboard: "USERQUESTIONFRIENDUNPINNED",
          },
        },
      },
    },
  };
}

export function dataUpdateUserQuestionFriendRePinnedByFriendProfile(): Prisma.UserQuestionFriendUpdateInput {
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

export function dataUpdateUserQuestionFriendRePinnedByFriendDashboard(): Prisma.UserQuestionFriendUpdateInput {
  return {
    isPinnedByFriend: true,
    pinnedByFriendAt: new Date(),
    contact: {
      update: {
        userLast: {
          update: {
            statusDashboard: "USERQUESTIONFRIENDREPINNED",
          },
        },
      },
    },
  };
}

export function dataUpdateUserQuestionFriendPinnedOfFriends(): Prisma.UserQuestionFriendUpdateInput {
  return {
    isPinnedOfFriends: true,
    pinnedOfFriendsAt: new Date(),
    contact: {
      update: {
        userLast: {
          update: {
            statusDashboard: "OFFRIENDSPINNED",
          },
        },
      },
    },
  };
}
