import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export function selectSentContacts(): Prisma.ContactSelect<DefaultArgs> {
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
      state: "LIVE",
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
      state: "LIVE",
    },
    userLast: {
      state: "LIVE" || "DEACTIVATED",
    },
  };
}
