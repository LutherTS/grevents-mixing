import { prisma } from "~/utilities/db.server";
import {
  CONTACT_ARBITRARY_LIMIT,
  selectContacts,
  whereSentFromContactsByUserIdAndProcessRelationship,
  whereSentToContactsByUserIdAndProcessRelationship,
  whereUserFriendsByUserIdAndKind,
} from "../subdata/contacts";

export async function findSentFriendToContactsByUserId(userId: string) {
  const select = selectContacts();
  const where = whereSentToContactsByUserIdAndProcessRelationship(
    userId,
    "SENTFRIEND"
  );

  return await prisma.contact.findMany({
    select,
    where,
    orderBy: {
      sentFriendAt: "desc",
    },
    take: CONTACT_ARBITRARY_LIMIT,
  });
}

export async function countSentFriendToContactsByUserId(userId: string) {
  const where = whereSentToContactsByUserIdAndProcessRelationship(
    userId,
    "SENTFRIEND"
  );

  return await prisma.contact.count({
    where,
  });
}

export async function findSentIrlToContactsByUserId(userId: string) {
  const select = selectContacts();
  const where = whereSentToContactsByUserIdAndProcessRelationship(
    userId,
    "SENTIRL"
  );

  return await prisma.contact.findMany({
    select,
    where,
    orderBy: {
      sentIrlAt: "desc",
    },
    take: CONTACT_ARBITRARY_LIMIT,
  });
}

export async function countSentIrlToContactsByUserId(userId: string) {
  const where = whereSentToContactsByUserIdAndProcessRelationship(
    userId,
    "SENTIRL"
  );

  return await prisma.contact.count({
    where,
  });
}

export async function findSentFriendFromContactsByUserId(userId: string) {
  const select = selectContacts();
  const where = whereSentFromContactsByUserIdAndProcessRelationship(
    userId,
    "SENTFRIEND"
  );

  return await prisma.contact.findMany({
    select,
    where,
    orderBy: {
      mirror: {
        sentFriendAt: "desc",
      },
    },
    take: CONTACT_ARBITRARY_LIMIT,
  });
}

export async function countSentFriendFromContactsByUserId(userId: string) {
  const where = whereSentFromContactsByUserIdAndProcessRelationship(
    userId,
    "SENTFRIEND"
  );

  return await prisma.contact.count({
    where,
  });
}

export async function findSentIrlFromContactsByUserId(userId: string) {
  const select = selectContacts();
  const where = whereSentFromContactsByUserIdAndProcessRelationship(
    userId,
    "SENTIRL"
  );

  return await prisma.contact.findMany({
    select,
    where,
    orderBy: {
      mirror: {
        sentIrlAt: "desc",
      },
    },
    take: CONTACT_ARBITRARY_LIMIT,
  });
}

export async function countSentIrlFromContactsByUserId(userId: string) {
  const where = whereSentFromContactsByUserIdAndProcessRelationship(
    userId,
    "SENTIRL"
  );

  return await prisma.contact.count({
    where,
  });
}

export async function findUserNotIrlFriendsByUserId(userId: string) {
  const select = selectContacts();
  const where = whereUserFriendsByUserIdAndKind(userId, "FRIEND");

  return await prisma.contact.findMany({
    select,
    where,
    orderBy: {
      userLast: {
        username: "asc",
      },
    },
    take: CONTACT_ARBITRARY_LIMIT,
  });
}

export async function findUserIrlFriendsByUserId(userId: string) {
  const select = selectContacts();
  const where = whereUserFriendsByUserIdAndKind(userId, "IRL");

  return await prisma.contact.findMany({
    select,
    where,
    orderBy: {
      userLast: {
        username: "asc",
      },
    },
    take: CONTACT_ARBITRARY_LIMIT,
  });
}
