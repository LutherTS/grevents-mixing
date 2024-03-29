import { Prisma } from "@prisma/client";

import { prisma } from "~/utilities/server/db.server";
import { whereUniqueContactByUserFirstIdAndUserLastId } from "../subdata/contacts";

// if statusOtherProfile is undefined, resetContactStatusOtherProfileById
export async function updateContactStatusOtherProfileById(
  id: string,
  statusOtherProfile?: string
) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  let data: Prisma.ContactUpdateInput = { statusOtherProfile: "NONE" };
  if (statusOtherProfile) {
    data = { statusOtherProfile };
  }

  return await prisma.contact.update({
    where,
    data,
  });
}

// if statusRelationship is undefined, resetMirrorContactStatusRelationshipById
export async function updateMirrorContactStatusRelationshipById(
  id: string,
  statusRelationship?: string
) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  let data: Prisma.ContactUpdateInput = {
    mirror: { update: { statusRelationship: "NONE" } },
  };
  if (statusRelationship) {
    data = {
      mirror: { update: { statusRelationship } },
    };
  }

  return await prisma.contact.update({
    where,
    data,
  });
}

export async function upsertContactThroughFindByOtherUserIdAndVerifiedUserId(
  otherUserId: string,
  verifiedUserId: string
) {
  const where = whereUniqueContactByUserFirstIdAndUserLastId(
    otherUserId,
    verifiedUserId
  );

  return await prisma.contact.upsert({
    select: { id: true },
    where,
    create: {
      userFirstId: otherUserId,
      userLastId: verifiedUserId,
      state: "LIVE",
      kind: "NONE",
      statusOtherProfile: "FIRSTACCESSEDTHROUGHFIND",
    },
    update: {
      statusOtherProfile: "REACCESSEDTHROUGHFIND",
    },
  });
}

export async function upsertContactThroughFindByVerifiedUserIdAndOtherUserId(
  verifiedUserId: string,
  otherUserId: string
) {
  const where = whereUniqueContactByUserFirstIdAndUserLastId(
    verifiedUserId,
    otherUserId
  );

  return await prisma.contact.upsert({
    select: { id: true },
    where,
    create: {
      userFirstId: verifiedUserId,
      userLastId: otherUserId,
      state: "LIVE",
      kind: "NONE",
      statusOtherProfile: "HASFIRSTACCESSEDTHROUGHFIND",
      latestfoundAt: new Date(),
    },
    update: {
      statusOtherProfile: "HASREACCESSEDTHROUGHFIND",
      latestfoundAt: new Date(),
    },
  });
}

export async function updateContactMirrorId(
  contactId: string,
  mirrorId: string
) {
  return await prisma.contact.update({
    where: {
      id: contactId,
    },
    data: {
      mirrorId,
    },
  });
}

export async function updateSendFriendRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      processRelationship: "NONE",
      statusRelationship: "RECEIVEFRIEND",
      annulFriendAt: null,
      mirror: {
        update: {
          processRelationship: "SENTFRIEND",
          statusRelationship: "SENTFRIEND",
          sentFriendAt: new Date(),
        },
      },
    },
  });
}

export async function updateBlockByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      blockedAt: new Date(),
      statusRelationship: "NOWBLOCKED",
      kind: "NONE",
      processRelationship: "NONE",
      mirror: {
        update: {
          blocking: true,
          statusRelationship: "NOWBLOCKING",
          kind: "NONE",
          processRelationship: "NONE",
        },
      },
    },
  });
}

export async function updateBlockBackByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      blockedAt: new Date(),
      statusRelationship: "NOWBLOCKEDBACK",
      kind: "NONE",
      processRelationship: "NONE",
      mirror: {
        update: {
          blocking: true,
          statusRelationship: "NOWBLOCKINGBACK",
          kind: "NONE",
          processRelationship: "NONE",
        },
      },
    },
  });
}

export async function updateAnnulFriendRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      mirror: {
        update: {
          processRelationship: "ANNULFRIEND",
          statusRelationship: "ANNULFRIEND",
          annulFriendAt: new Date(),
          sentFriendAt: null,
        },
      },
    },
  });
}

export async function updateAcceptFriendRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      friendAt: new Date(),
      statusRelationship: "NOWFRIENDS",
      kind: "FRIEND",
      processRelationship: "NONE",
      sentFriendAt: null,
      mirror: {
        update: {
          friendAt: new Date(),
          statusRelationship: "NOWFRIENDS",
          kind: "FRIEND",
          processRelationship: "NONE",
        },
      },
    },
  });
}

export async function updateDeclineFriendRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      statusRelationship: "NONE",
      processRelationship: "NONE",
      sentFriendAt: null,
      mirror: {
        update: {
          statusRelationship: "REFUSEDFRIEND",
          processRelationship: "NONE",
        },
      },
    },
  });
}

export async function updateSendIrlRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      processRelationship: "NONE",
      statusRelationship: "RECEIVEIRL",
      annulIrlAt: null,
      mirror: {
        update: {
          processRelationship: "SENTIRL",
          statusRelationship: "SENTIRL",
          sentIrlAt: new Date(),
        },
      },
    },
  });
}

export async function updateUnfriendByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      statusRelationship: "NOLONGERFRIENDS",
      kind: "NONE",
      processRelationship: "NONE",
      friendAt: null,
      mirror: {
        update: {
          statusRelationship: "NOLONGERFRIENDS",
          kind: "NONE",
          processRelationship: "NONE",
          friendAt: null,
        },
      },
    },
  });
}

export async function updateAnnulIrlRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      mirror: {
        update: {
          processRelationship: "ANNULIRL",
          statusRelationship: "ANNULIRL",
          annulIrlAt: new Date(),
          sentIrlAt: null,
        },
      },
    },
  });
}

export async function updateAcceptIrlRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      irlAt: new Date(),
      statusRelationship: "NOWIRLS",
      kind: "IRL",
      processRelationship: "NONE",
      sentIrlAt: null,
      mirror: {
        update: {
          irlAt: new Date(),
          statusRelationship: "NOWIRLS",
          kind: "IRL",
          processRelationship: "NONE",
        },
      },
    },
  });
}

export async function updateDeclineIrlRequestByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      statusRelationship: "NONE",
      processRelationship: "NONE",
      sentIrlAt: null,
      mirror: {
        update: {
          statusRelationship: "REFUSEDIRL",
          processRelationship: "NONE",
        },
      },
    },
  });
}

export async function updateDowngradeFromIrlByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      statusRelationship: "NOLONGERIRLS",
      kind: "FRIEND",
      processRelationship: "NONE",
      irlAt: null,
      mirror: {
        update: {
          statusRelationship: "NOLONGERIRLS",
          kind: "FRIEND",
          processRelationship: "NONE",
          irlAt: null,
        },
      },
    },
  });
}

export async function updateUnblockByContactId(id: string) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  return await prisma.contact.update({
    where,
    data: {
      blockedAt: null,
      statusRelationship: "NOWUNBLOCKED",
      kind: "NONE",
      processRelationship: "NONE",
      mirror: {
        update: {
          blocking: false,
          statusRelationship: "NOWUNBLOCKING",
          kind: "NONE",
          processRelationship: "NONE",
        },
      },
    },
  });
}
