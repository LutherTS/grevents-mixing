import { prisma } from "~/utilities/server/db.server";
import { whereByIdAndContactUserFirstId } from "../subdata/userquestionfriends";
import {
  dataUpdateUserQuestionFriendCancelPinnedByFriend,
  dataUpdateUserQuestionFriendCancelSharedToFriend,
} from "../subchanges/userquestionfriends";

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

export async function updateUserQuestionFriendCancelPinnedByFriend(
  id: string,
  userFirstId: string
) {
  const where = whereByIdAndContactUserFirstId(id, userFirstId);
  const data = dataUpdateUserQuestionFriendCancelPinnedByFriend();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}
