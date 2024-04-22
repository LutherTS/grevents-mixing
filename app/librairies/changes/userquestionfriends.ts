import { prisma } from "~/utilities/server/db.server";
import {
  whereByIdAndContactUserFirstId,
  whereByIdAndContactUserLastId,
} from "../subdata/userquestionfriends";
import {
  dataUpdateUserQuestionFriendCancelPinnedByFriendDashboard,
  dataUpdateUserQuestionFriendCancelPinnedByFriendProfile,
  dataUpdateUserQuestionFriendCancelSharedToFriend,
  dataUpdateUserQuestionFriendPinnedOfFriends,
  dataUpdateUserQuestionFriendRePinnedByFriendDashboard,
  dataUpdateUserQuestionFriendRePinnedByFriendProfile,
  dataUpdateUserQuestionFriendRePinnedOfFriends,
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

export async function updateUserQuestionFriendCancelPinnedByFriendProfile(
  id: string,
  userLastId: string
) {
  const where = whereByIdAndContactUserLastId(id, userLastId);
  const data = dataUpdateUserQuestionFriendCancelPinnedByFriendProfile();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}

export async function updateUserQuestionFriendCancelPinnedByFriendDashboard(
  id: string,
  userLastId: string
) {
  const where = whereByIdAndContactUserLastId(id, userLastId);
  const data = dataUpdateUserQuestionFriendCancelPinnedByFriendDashboard();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}

export async function updateUserQuestionFriendRePinnedByFriendProfile(
  id: string,
  userLastId: string
) {
  const where = whereByIdAndContactUserLastId(id, userLastId);
  const data = dataUpdateUserQuestionFriendRePinnedByFriendProfile();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}

export async function updateUserQuestionFriendRePinnedByFriendDashboard(
  id: string,
  userLastId: string
) {
  const where = whereByIdAndContactUserLastId(id, userLastId);
  const data = dataUpdateUserQuestionFriendRePinnedByFriendDashboard();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}

export async function updateUserQuestionFriendPinnedOfFriends(id: string) {
  const where = { id };
  const data = dataUpdateUserQuestionFriendPinnedOfFriends();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}

export async function updateUserQuestionFriendRePinnedOfFriends(
  id: string,
  userLastId: string
) {
  const where = whereByIdAndContactUserLastId(id, userLastId);
  const data = dataUpdateUserQuestionFriendRePinnedOfFriends();

  return await prisma.userQuestionFriend.update({
    where,
    data,
  });
}
