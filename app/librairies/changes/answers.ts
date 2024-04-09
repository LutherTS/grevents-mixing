import { prisma } from "~/utilities/server/db.server";
import {
  whereAnswerByIdAndContactId,
  whereAnswerByIdAndUserId,
} from "../subdata/answers";
import {
  dataHideAnswerUserQuestion,
  dataPinAnswerUserQuestion,
  dataPseudoIrlAnswerUserQuestion,
  dataPseudoNotIrlAnswerUserQuestion,
  dataRePinAnswerUserQuestion,
  dataRevealAnswerUserQuestion,
  dataUnpinAnswerUserQuestion,
  dataUpdateAnswerStateDeletedStatusPersonalInfo,
  dataUpdateAnswerValueStatusPersonalInfo,
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

export async function rePinAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataRePinAnswerUserQuestion();

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
  userQuestionId: string,
  contactId: string
) {
  const where = whereAnswerByIdAndContactId(id, contactId);
  const data = dataUpsertAnswerUserQuestionFriendPinnedByFriend(
    userQuestionId,
    contactId
  );

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function hideAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataHideAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function revealAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataRevealAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function updateAnswerValueStatusPersonalInfoByIdAndUserId(
  id: string,
  userId: string,
  value: string,
  statusPersonalInfo: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data = dataUpdateAnswerValueStatusPersonalInfo(
    value,
    statusPersonalInfo
  );

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function updateAnswerStateDeletedStatusPersonalInfoByIdAndUserId(
  id: string,
  userId: string,
  statusPersonalInfo: string
) {
  const where = whereAnswerByIdAndUserId(id, userId);
  const data =
    dataUpdateAnswerStateDeletedStatusPersonalInfo(statusPersonalInfo);

  return await prisma.answer.update({
    where,
    data,
  });
}
