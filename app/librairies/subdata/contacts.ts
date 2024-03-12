import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const DEFAULT_CONTACTS_ORDER_BY = [
  {
    userLast: {
      appWideName: "asc",
    },
  },
  {
    userLast: {
      username: "asc",
    },
  },
] as Prisma.ContactOrderByWithRelationInput[];

export const CONTACT_ARBITRARY_LIMIT = 256;

export function selectContacts() {
  // : Prisma.ContactSelect<DefaultArgs>
  return {
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
  };
}

export function whereSentToContactsByUserIdAndProcessRelationship(
  userFirstId: string,
  processRelationship: string
) {
  // : Prisma.ContactWhereInput
  return {
    userFirstId,
    processRelationship,
    state: "LIVE",
    mirror: {
      state: "LIVE",
    },
    userFirst: {
      state: "LIVE" || "DEACTIVATED",
    },
    userLast: {
      state: "LIVE" || "DEACTIVATED",
    },
  };
}

export function whereSentFromContactsByUserIdAndProcessRelationship(
  userLastId: string,
  processRelationship: string
) {
  // : Prisma.ContactWhereInput
  return {
    userLastId,
    processRelationship,
    state: "LIVE",
    mirror: {
      state: "LIVE",
    },
    userFirst: {
      state: "LIVE" || "DEACTIVATED",
    },
    userLast: {
      state: "LIVE" || "DEACTIVATED",
    },
  };
}

export function whereUserFriendsByUserIdAndKind(
  userFirstId: string,
  kind: string
) {
  // : Prisma.ContactWhereInput
  return {
    userFirstId,
    kind,
    state: "LIVE",
    mirror: {
      kind,
      state: "LIVE",
    },
    userFirst: {
      state: "LIVE" || "DEACTIVATED",
    },
    userLast: {
      state: "LIVE" || "DEACTIVATED",
    },
  };
}

// plural implicit
export function whereUserWhoIAmBlockingByUserId(userFirstId: string) {
  // : Prisma.ContactWhereInput
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
      state: "LIVE" || "DEACTIVATED",
    },
    userLast: {
      state: "LIVE" || "DEACTIVATED",
    },
  };
}

// plural explicit
export function whereUserWhoHaveMeBlockedByUserId(userFirstId: string) {
  // : Prisma.ContactWhereInput
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
      state: "LIVE" || "DEACTIVATED",
    },
    userLast: {
      state: "LIVE" || "DEACTIVATED",
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
      state: "LIVE" || "DEACTIVATED",
    },
    mirror: {
      state: "LIVE",
    },
    OR: [
      {
        kind: "FRIEND",
        blocking: false,
        mirror: {
          kind: "FRIEND",
          blocking: false,
        },
      },
      {
        kind: "IRL",
        blocking: false,
        mirror: {
          kind: "IRL",
          blocking: false,
        },
      },
    ],
    userQuestionFriends: {
      none: {
        userQuestionId,
        isSharedToFriend: true,
        state: "LIVE",
        contact: {
          OR: [
            {
              kind: "FRIEND",
              blocking: false,
              mirror: {
                kind: "FRIEND",
                blocking: false,
              },
            },
            {
              kind: "IRL",
              blocking: false,
              mirror: {
                kind: "IRL",
                blocking: false,
              },
            },
          ],
        },
      },
    },
  };
}

// Once the query is built and tested, that OR and its insides ("friend", "irl") need to be either functions or variables.
// Because if in the future in need to change my query definition of what it means to be friends, it will be streamlined to do it only on these (top-of-the-file, exported) variables.
