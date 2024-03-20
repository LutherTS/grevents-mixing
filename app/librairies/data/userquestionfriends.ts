import { prisma } from "~/utilities/server/db.server";
import {
  DEFAULT_USERQUESTIONFRIENDS_ORDER_BY,
  PINNED_BY_FRIEND_ANSWERS_LIMIT,
  PINNED_BY_FRIEND_ANSWERS_ORDER_BY,
  selectUserQuestionFriends,
  selectUserQuestionFriendsAnswers,
  wherePinnedByFriend,
  whereUserQuestionFriendsByUserQuestionId,
} from "../subdata/userquestionfriends";
import { ARBITRARY_CONTACTS_LIMIT } from "../subdata/contacts";

const orderBy = DEFAULT_USERQUESTIONFRIENDS_ORDER_BY;

const take = ARBITRARY_CONTACTS_LIMIT;

export async function findUserQuestionFriendsByUserQuestionId(
  userQuestionId: string
) {
  const select = selectUserQuestionFriends;
  const where = whereUserQuestionFriendsByUserQuestionId(userQuestionId);

  return await prisma.userQuestionFriend.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

// Profile functions

export async function findUserQuestionFriendsAnswersPinnedByFriend(
  userId: string,
  contactId: string
) {
  const select = selectUserQuestionFriendsAnswers;
  const where = wherePinnedByFriend(userId, contactId);

  return await prisma.userQuestionFriend.findMany({
    select,
    where,
    orderBy: PINNED_BY_FRIEND_ANSWERS_ORDER_BY,
    take: PINNED_BY_FRIEND_ANSWERS_LIMIT,
  });
}

export async function countUserQuestionFriendsAnswersPinnedByFriend(
  userId: string,
  contactId: string
) {
  const where = wherePinnedByFriend(userId, contactId);

  return await prisma.userQuestionFriend.count({
    where,
  });
}
