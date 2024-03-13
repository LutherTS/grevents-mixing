import { prisma } from "~/utilities/server/db.server";
import {
  DEFAULT_USERQUESTIONFRIENDS_ORDER_BY,
  selectUserQuestionFriends,
  whereUserQuestionFriendsByUserQuestionId,
} from "../subdata/userquestionfriends";
import { ARBITRARY_CONTACTS_LIMIT } from "../subdata/contacts";

const orderBy = DEFAULT_USERQUESTIONFRIENDS_ORDER_BY;

const take = ARBITRARY_CONTACTS_LIMIT;

export async function findUserQuestionFriendsByUserQuestionId(
  userQuestionId: string
) {
  const select = selectUserQuestionFriends();
  const where = whereUserQuestionFriendsByUserQuestionId(userQuestionId);

  return await prisma.userQuestionFriend.findMany({
    select,
    where,
    orderBy,
    take,
  });
}
