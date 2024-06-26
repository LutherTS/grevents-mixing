import { prisma } from "~/utilities/server/db.server";
import {
  DEFAULT_CONTACTS_ORDER_BY,
  ARBITRARY_CONTACTS_LIMIT,
  selectContacts,
  whereSentFromContactsByUserIdAndProcessRelationship,
  whereSentToContactsByUserIdAndProcessRelationship,
  whereUserFriendsByUserIdAndKind,
  whereUserFriendsNotToUserQuestionByUserQuestionIdAndUserId,
  whereUserWhoHaveMeBlockedByUserId,
  whereUserWhoIAmBlockingByUserId,
  whereContactByUserFirstIdAndUserLastUsername,
  whereContactByUserFirstIdAndUserLastId,
  whereContactByIdAndUserFirstId,
  whereContactByIdAndUserLastId,
  whereHasAccessedFromContactsByUserId,
  whereContactById,
} from "../subdata/contacts";

const orderBy = DEFAULT_CONTACTS_ORDER_BY;

const take = ARBITRARY_CONTACTS_LIMIT;

export async function findSentFriendToContactsByUserId(userId: string) {
  const select = selectContacts; // this could simply become the default select at this point, given its ubiquitousness and reliance
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
    take,
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
  const select = selectContacts;
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
    take,
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
  const select = selectContacts;
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
    take,
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
  const select = selectContacts;
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
    take,
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
  const select = selectContacts;
  const where = whereUserFriendsByUserIdAndKind(userId, "FRIEND");

  return await prisma.contact.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUserIrlFriendsByUserId(userId: string) {
  const select = selectContacts;
  const where = whereUserFriendsByUserIdAndKind(userId, "IRL");

  return await prisma.contact.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

// plural implicit
export async function findUserWhoIAmBlockingByUserId(userId: string) {
  const select = selectContacts;
  const where = whereUserWhoIAmBlockingByUserId(userId);

  return await prisma.contact.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

// plural explicit
export async function findUserWhoHaveMeBlockedByUserId(userId: string) {
  const select = selectContacts;
  const where = whereUserWhoHaveMeBlockedByUserId(userId);

  return await prisma.contact.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUserFriendsNotToUserQuestionByUserQuestionIdAndUserId(
  userQuestionId: string,
  userFirstId: string
) {
  const select = selectContacts;
  const where = whereUserFriendsNotToUserQuestionByUserQuestionIdAndUserId(
    userQuestionId,
    userFirstId
  );

  return await prisma.contact.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findContactByUserFirstIdAndUserLastUsername(
  userFirstId: string,
  username: string
) {
  const select = selectContacts;
  const where = whereContactByUserFirstIdAndUserLastUsername(
    userFirstId,
    username
  );

  return await prisma.contact.findFirst({
    select,
    where,
  });
}

export async function findContactByUserFirstIdAndUserLastId(
  userFirstId: string,
  userLastId: string
) {
  const select = selectContacts;
  const where = whereContactByUserFirstIdAndUserLastId(userFirstId, userLastId);

  return await prisma.contact.findUnique({
    select,
    where,
  });
}

export async function findContactByIdAndUserFirstId(
  id: string,
  userFirstId: string
) {
  const select = selectContacts;
  const where = whereContactByIdAndUserFirstId(id, userFirstId);

  return await prisma.contact.findUnique({
    select,
    where,
  });
}

export async function findContactByIdAndUserLastId(
  id: string,
  userLastId: string
) {
  const select = selectContacts;
  const where = whereContactByIdAndUserLastId(id, userLastId);

  return await prisma.contact.findUnique({
    select,
    where,
  });
}

export async function findHasAccessedFromContactsByUserId(userId: string) {
  const select = selectContacts;
  const where = whereHasAccessedFromContactsByUserId(userId);

  return await prisma.contact.findMany({
    select,
    where,
    orderBy: {
      mirror: {
        latestfoundAt: "desc",
      },
    },
    take,
  });
}

export async function countHasAccessedFromContactsByUserId(userId: string) {
  const where = whereHasAccessedFromContactsByUserId(userId);

  return await prisma.contact.count({
    where,
  });
}

export async function findContactById(id: string) {
  const select = selectContacts;
  const where = whereContactById(id);

  return await prisma.contact.findUnique({
    select,
    where,
  });
}
