import { prisma } from "~/utilities/server/db.server";
import { whereAnswerByIdAndUserId } from "../subdata/answers";
import {
  dataPinAnswerUserQuestion,
  dataPseudoIrlAnswerUserQuestion,
  dataPseudoNotIrlAnswerUserQuestion,
  dataUnpinAnswerUserQuestion,
  dataUpsertAnswerUserQuestionFriendPinnedByFriend,
  dataUpsertAnswerUserQuestionFriendSharedToFriend,
} from "../subchanges/answers";

export async function pinAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataPinAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function unpinAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataUnpinAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function pseudoIrlAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataPseudoIrlAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function pseudoNotIrlAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataPseudoNotIrlAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function upsertAnswerUserQuestionFriendSharedToFriend(
  id: string,
  userId: string,
  userQuestionId: string,
  contactId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataUpsertAnswerUserQuestionFriendSharedToFriend(
    userQuestionId,
    contactId
  );

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function upsertAnswerUserQuestionFriendPinnedByFriend(
  id: string,
  userId: string,
  userQuestionId: string,
  contactId: string,
  userFirstId: string,
  userLastId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataUpsertAnswerUserQuestionFriendPinnedByFriend(
    userQuestionId,
    contactId,
    userFirstId,
    userLastId
  );

  return await prisma.answer.update({
    where,
    data,
  });
}
