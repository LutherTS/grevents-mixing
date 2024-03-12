import { prisma } from "~/utilities/db.server";
import {
  whereSentFromContactsByUserIdAndProcessRelationship,
  whereSentToContactsByUserIdAndProcessRelationship,
} from "../subdata/contacts";

export async function countSentFriendToContactsByUserId(userId: string) {
  const where = whereSentToContactsByUserIdAndProcessRelationship(
    userId,
    "SENTFRIEND"
  );

  return await prisma.contact.count({
    where,
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

export async function countSentFriendFromContactsByUserId(userId: string) {
  const where = whereSentFromContactsByUserIdAndProcessRelationship(
    userId,
    "SENTFRIEND"
  );

  return await prisma.contact.count({
    where,
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
