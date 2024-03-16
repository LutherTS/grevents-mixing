import { Prisma } from "@prisma/client";

import { isFriend, isIrl } from "./contacts";
import {
  DEFAULT_USERS_ORDER_BY_1ST,
  DEFAULT_USERS_ORDER_BY_2ND,
} from "./users";

// same as contacts at this time but nested
export const DEFAULT_USERQUESTIONFRIENDS_ORDER_BY = [
  {
    contact: {
      userLast: DEFAULT_USERS_ORDER_BY_1ST,
    },
  },
  {
    contact: {
      userLast: DEFAULT_USERS_ORDER_BY_2ND,
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
        OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
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
