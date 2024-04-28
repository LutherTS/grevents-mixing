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

export const PINNED_BY_FRIEND_ANSWERS_ORDER_BY = [
  {
    pinnedByFriendAt: "desc",
  },
  {
    updatedAt: "desc",
  },
] satisfies Prisma.UserQuestionFriendOrderByWithRelationInput[];

export const PINNED_OF_FRIENDS_ANSWERS_ORDER_BY = [
  {
    pinnedOfFriendsAt: "desc",
  },
  {
    updatedAt: "desc",
  },
] satisfies Prisma.UserQuestionFriendOrderByWithRelationInput[];

export const PINNED_BY_FRIEND_ANSWERS_LIMIT = 8;

export const PINNED_OF_FRIENDS_ANSWERS_LIMIT = 32;

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

// this is a repurpose, a rewiring, from selectAnswers
export const selectUserQuestionFriendsAnswers = {
  id: true,
  isPinnedOfFriends: true,
  userQuestion: {
    select: {
      id: true,
      kind: true,
      question: {
        select: {
          name: true,
          kind: true,
        },
      },
      answer: {
        select: {
          value: true,
          source: true,
          id: true,
          user: {
            select: {
              username: true,
              appWideName: true,
              id: true,
            },
          },
        },
      },
    },
  },
  contact: {
    select: {
      id: true,
      userLast: {
        select: {
          username: true,
          id: true,
          appWideName: true,
        },
      },
    },
  },
} satisfies Prisma.UserQuestionFriendSelect;

export function wherePinnedByFriend(
  userId: string,
  contactId: string
): Prisma.UserQuestionFriendWhereInput {
  return {
    contactId,
    isPinnedByFriend: true,
    state: "LIVE",
    contact: {
      state: "LIVE",
      userFirst: {
        state: "LIVE",
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
    userQuestion: {
      answer: {
        userId,
        state: "LIVE",
        user: {
          state: "LIVE",
        },
      },
    },
  };
}

export function wherePinnedOfFriends(
  userLastId: string
): Prisma.UserQuestionFriendWhereInput {
  return {
    isPinnedOfFriends: true,
    state: "LIVE",
    contact: {
      userLastId,
      userLast: {
        state: "LIVE",
      },
      mirror: {
        state: "LIVE",
      },
      state: "LIVE",
    },
    OR: [
      {
        contact: isFriend,
      },
      {
        contact: isIrl,
      },
    ],
    userQuestion: {
      answer: {
        state: "LIVE",
        user: {
          state: "LIVE",
        },
      },
    },
  };
}

export function wherePinnedOfFriendsDeactivated(
  userLastId: string
): Prisma.UserQuestionFriendWhereInput {
  return {
    isPinnedOfFriends: true,
    state: "LIVE",
    contact: {
      userLastId,
      userLast: {
        state: "LIVE",
      },
      mirror: {
        state: "LIVE",
      },
      state: "LIVE",
    },
    OR: [
      {
        contact: isFriend,
      },
      {
        contact: isIrl,
      },
    ],
    userQuestion: {
      answer: {
        state: "LIVE",
        user: {
          state: "DEACTIVATED",
        },
      },
    },
  };
}

export function whereByIdAndContactUserFirstId(
  id: string,
  userFirstId: string
): Prisma.UserQuestionFriendWhereUniqueInput {
  return {
    id,
    contact: {
      userFirstId,
    },
  };
}

export function whereByIdAndContactUserLastId(
  id: string,
  userLastId: string
): Prisma.UserQuestionFriendWhereUniqueInput {
  return {
    id,
    contact: {
      userLastId,
    },
  };
}
