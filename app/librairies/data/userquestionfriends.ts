import { prisma } from "~/utilities/db.server";
import {
  selectUserQuestionFriends,
  whereUserQuestionFriendsByUserQuestionId,
} from "../subdata/userquestionfriends";
import { CONTACT_ARBITRARY_LIMIT } from "../subdata/contacts";

export async function findUserQuestionFriendsByUserQuestionId(
  userQuestionId: string
) {
  const select = selectUserQuestionFriends();
  const where = whereUserQuestionFriendsByUserQuestionId(userQuestionId);

  return await prisma.userQuestionFriend.findMany({
    select,
    where,
    orderBy: [
      {
        contact: {
          userLast: {
            appWideName: "asc",
          },
        },
      },
      {
        contact: {
          userLast: {
            username: "asc",
          },
        },
      },
    ],
    take: CONTACT_ARBITRARY_LIMIT,
  });
}
