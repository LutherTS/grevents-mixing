import { Prisma } from "@prisma/client";
import {
  DEFAULT_USERS_ORDER_BY_1ST,
  DEFAULT_USERS_ORDER_BY_2ND,
} from "./users";

export const DEFAULT_CONTACTS_ORDER_BY = [
  {
    userLast: DEFAULT_USERS_ORDER_BY_1ST,
  },
  {
    userLast: DEFAULT_USERS_ORDER_BY_2ND,
  },
] satisfies Prisma.ContactOrderByWithRelationInput[];

export const ARBITRARY_CONTACTS_LIMIT = 256;

export const isFriend = {
  kind: "FRIEND",
  blocking: false,
  state: "LIVE",
  mirror: {
    kind: "FRIEND",
    blocking: false,
    state: "LIVE",
  },
} satisfies Prisma.ContactWhereInput;

export const isIrl = {
  kind: "IRL",
  blocking: false,
  state: "LIVE",
  mirror: {
    kind: "IRL",
    blocking: false,
    state: "LIVE",
  },
} satisfies Prisma.ContactWhereInput;

export const selectContacts = {
  kind: true,
  blocking: true,
  id: true,
  processRelationship: true,
  userFirst: {
    select: {
      id: true,
      username: true,
      appWideName: true,
      state: true,
    },
  },
  mirror: {
    select: {
      kind: true,
      blocking: true,
      id: true,
      processRelationship: true,
      userFirst: {
        select: {
          id: true,
          username: true,
          appWideName: true,
          state: true,
        },
      },
    },
  },
} satisfies Prisma.ContactSelect;

export function whereSentToContactsByUserIdAndProcessRelationship(
  userFirstId: string,
  processRelationship: string
): Prisma.ContactWhereInput {
  return {
    userFirstId,
    processRelationship,
    state: "LIVE",
    mirror: {
      state: "LIVE",
    },
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    userLast: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}

export function whereSentFromContactsByUserIdAndProcessRelationship(
  userLastId: string,
  processRelationship: string
): Prisma.ContactWhereInput {
  return {
    state: "LIVE",
    mirror: {
      state: "LIVE",
      userLastId,
      processRelationship,
    },
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    userLast: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}

export function whereUserFriendsByUserIdAndKind(
  userFirstId: string,
  kind: string
): Prisma.ContactWhereInput {
  return {
    userFirstId,
    kind,
    state: "LIVE",
    mirror: {
      kind,
      state: "LIVE",
    },
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    userLast: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}

// plural implicit
export function whereUserWhoIAmBlockingByUserId(
  userFirstId: string
): Prisma.ContactWhereInput {
  return {
    userFirstId,
    blocking: true,
    kind: "NONE",
    state: "LIVE",
    mirror: {
      kind: "NONE",
      state: "LIVE",
    },
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    userLast: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}

// plural explicit
export function whereUserWhoHaveMeBlockedByUserId(
  userFirstId: string
): Prisma.ContactWhereInput {
  return {
    userFirstId,
    kind: "NONE",
    state: "LIVE",
    mirror: {
      blocking: true,
      kind: "NONE",
      state: "LIVE",
    },
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    userLast: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}

export function whereUserFriendsNotToUserQuestionByUserQuestionIdAndUserId(
  userQuestionId: string,
  userFirstId: string
): Prisma.ContactWhereInput {
  return {
    userFirstId,
    state: "LIVE",
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    mirror: {
      state: "LIVE",
    },
    OR: [isFriend, isIrl],
    userQuestionFriends: {
      none: {
        userQuestionId,
        isSharedToFriend: true,
        state: "LIVE",
        contact: {
          OR: [isFriend, isIrl],
        },
      },
    },
  };
}

export function whereContactByUserFirstIdAndUserLastUsername(
  userFirstId: string,
  username: string
): Prisma.ContactWhereInput {
  return {
    userFirstId,
    state: "LIVE",
    mirror: {
      state: "LIVE",
    },
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    userLast: {
      username,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}

export function whereContactByUserFirstIdAndUserLastId(
  userFirstId: string,
  userLastId: string
): Prisma.ContactWhereInput {
  return {
    userFirstId,
    userLastId,
    state: "LIVE",
    mirror: {
      state: "LIVE",
    },
    userFirst: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    userLast: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}
