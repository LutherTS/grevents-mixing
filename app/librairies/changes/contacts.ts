import { Prisma } from "@prisma/client";
import { prisma } from "~/utilities/server/db.server";

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

export async function upsertContactThroughFindByOtherUserIdAndVerifiedUserId(
  otherUserId: string,
  verifiedUserId: string
) {
  return await prisma.contact.upsert({
    select: { id: true },
    where: {
      userFirstId_userLastId: {
        userFirstId: otherUserId,
        userLastId: verifiedUserId,
      },
    },
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
  return await prisma.contact.upsert({
    select: { id: true },
    where: {
      userFirstId_userLastId: {
        userFirstId: verifiedUserId,
        userLastId: otherUserId,
      },
    },
    create: {
      userFirstId: verifiedUserId,
      userLastId: otherUserId,
      state: "LIVE",
      kind: "NONE",
      statusOtherProfile: "HASFIRSTACCESSEDTHROUGHFIND",
      // perhaps something to work on here for notifications
    },
    update: {
      statusOtherProfile: "HASREACCESSEDTHROUGHFIND",
      // I'll save it in the database but I won't use it as something
      // the user needs to be notified on at this time.
      // Actually I'll notify the user in notifications,
      // so that if too many unknown users find their profile
      // they'll know and could be prompted to change their friend code.
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
