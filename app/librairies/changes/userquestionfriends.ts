import { prisma } from "~/utilities/server/db.server";
import { whereByIdAndContactUserFirstId } from "../subdata/userquestionfriends";
import { dataUpdateUserQuestionFriendCancelSharedToFriend } from "../subchanges/userquestionfriends";

export async function updateUserQuestionFriendCancelSharedToFriend(
  id: string,
  userFirstId: string
) {
  const where = whereByIdAndContactUserFirstId(id, userFirstId);
  const data = dataUpdateUserQuestionFriendCancelSharedToFriend();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}
