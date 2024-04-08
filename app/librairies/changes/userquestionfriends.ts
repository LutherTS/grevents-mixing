import { prisma } from "~/utilities/server/db.server";
import {
  whereByIdAndContactUserFirstId,
  whereByIdAndContactUserLastId,
} from "../subdata/userquestionfriends";
import {
  dataUpdateUserQuestionFriendCancelPinnedByFriend,
  dataUpdateUserQuestionFriendCancelSharedToFriend,
  dataUpdateUserQuestionFriendRePinnedByFriend,
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
  userLastId: string
) {
  const where = whereByIdAndContactUserLastId(id, userLastId);
  const data = dataUpdateUserQuestionFriendCancelPinnedByFriend();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}

export async function updateUserQuestionFriendRePinnedByFriend(
  id: string,
  userLastId: string
) {
  const where = whereByIdAndContactUserLastId(id, userLastId);
  const data = dataUpdateUserQuestionFriendRePinnedByFriend();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}
