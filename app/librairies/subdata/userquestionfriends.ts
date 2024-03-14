import { Prisma } from "@prisma/client";

import { isFriend, isIrl } from "./contacts";

// same as contacts at this time but nested
export const DEFAULT_USERQUESTIONFRIENDS_ORDER_BY = [
  {
    contact: {
      userLast: {
        appWideName: "asc",
      },
    },
  },
  {
    contact: {
      userLast: {
        username: "asc",
      },
    },
  },
] as Prisma.UserQuestionFriendOrderByWithRelationInput[];

export const selectUserQuestionFriends = {
  id: true,
  contact: {
    select: {
      userLast: {
        select: {
          appWideName: true,
          username: true,
          state: true,
        },
      },
    },
  },
} satisfies Prisma.UserQuestionFriendSelect;

export function whereUserQuestionFriendsByUserQuestionId(
  userQuestionId: string
): Prisma.UserQuestionFriendWhereInput {
  return {
    userQuestionId,
    isSharedToFriend: true,
    state: "LIVE",
    contact: {
      state: "LIVE",
      userFirst: {
        state: "LIVE" || "DEACTIVATED",
      },
      mirror: {
        state: "LIVE",
      },
    },
    OR: [
      {
        contact: isFriend,
      },
      {
        contact: isIrl,
      },
    ],
  };
}
