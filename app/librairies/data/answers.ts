import { prisma } from "~/utilities/server/db.server";
import {
  DEFAULT_ANSWERS_ORDER_BY,
  DEFAULT_ANSWERS_LIMIT,
  PINNED_BY_USER_ANSWERS_LIMIT,
  selectUserQuestionAnswer,
  selectUserCustomAnswers,
  selectUserNativeAnswers,
  selectUserPinnedAnswers,
  selectUserPseudonativeAnswers,
  whereAnswerByUserQuestionIDAndUserID,
  whereUserCustomAnswersByUserId,
  whereUserNativeAnswersByUserIdAndQuestionKind,
  whereUserPinnedAnswersByUserId,
  whereUserPseudonativeAnswersByUserIdAndUserQuestionKind,
  selectAnswers,
  whereUserPinnedNotIrlAnswersByUserId,
  whereUserUnpinnedNativeAnswersByUserIdAndQuestionKind,
  whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKind,
  PINNED_BY_USER_ANSWERS_ORDER_BY,
  whereUserPinnedNotAndIrlAnswersByUserId,
  whereUserPinnedNotIrlAnswersByUserIdQueried,
  whereUserPinnedNotAndIrlAnswersByUserIdQueried,
  whereUserUnpinnedSharedToContactCustomAnswersQueried,
  selectAnswerId,
  whereEmailAddressByUserId,
  whereUserPinnedNotIrlAnswersByUserIdExposed,
  whereUserPinnedNotAndIrlAnswersByUserIdExposed,
  whereUserUnpinnedSharedToContactCustomAnswersExposed,
  whereUserUnpinnedNativeAnswersByUserIdAndQuestionKindExposed,
  whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKindExposed,
  whereAnswerByIdAndUserId,
  whereAnswerByIdAndContactId,
  selectUserPinnedForSelfAnswers,
  whereUserPinnedForSelfAnswersByUserId,
  PINNED_FOR_SELF_ANSWERS_ORDER_BY,
  PINNED_FOR_SELF_ANSWERS_LIMIT,
} from "../subdata/answers";

const orderBy = DEFAULT_ANSWERS_ORDER_BY;

const take = DEFAULT_ANSWERS_LIMIT;

export async function findUserPinnedForSelfAnswersByUserId(id: string) {
  const select = selectUserPinnedForSelfAnswers;
  const where = whereUserPinnedForSelfAnswersByUserId(id);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_FOR_SELF_ANSWERS_ORDER_BY,
    take: PINNED_FOR_SELF_ANSWERS_LIMIT,
  });
}

export async function countUserPinnedForSelfAnswersByUserId(id: string) {
  const where = whereUserPinnedForSelfAnswersByUserId(id);

  return await prisma.answer.count({
    where,
  });
}

export async function findUserPinnedAnswersByUserId(id: string) {
  const select = selectUserPinnedAnswers;
  const where = whereUserPinnedAnswersByUserId(id);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_BY_USER_ANSWERS_ORDER_BY,
    take: PINNED_BY_USER_ANSWERS_LIMIT,
  });
}

export async function countUserPinnedAnswersByUserId(id: string) {
  const where = whereUserPinnedAnswersByUserId(id);

  return await prisma.answer.count({
    where,
  });
}

export async function findUserNativeNotIrlAnswersByUserId(id: string) {
  const select = selectUserNativeAnswers;
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVE");

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function countUserNativeNotIrlAnswersByUserId(id: string) {
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVE");

  return await prisma.answer.count({
    where,
  });
}

export async function findUserNativeIrlAnswersByUserId(id: string) {
  const select = selectUserNativeAnswers;
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVEIRL");

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function countUserNativeIrlAnswersByUserId(id: string) {
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVEIRL");

  return await prisma.answer.count({
    where,
  });
}

export async function findUserPseudonativeNotIrlAnswersByUserId(id: string) {
  const select = selectUserPseudonativeAnswers;
  const where = whereUserPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVE"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function countUserPseudonativeNotIrlAnswersByUserId(id: string) {
  const where = whereUserPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVE"
  );

  return await prisma.answer.count({
    where,
  });
}

export async function findUserPseudonativeIrlAnswersByUserId(id: string) {
  const select = selectUserPseudonativeAnswers;
  const where = whereUserPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVEIRL"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function countUserPseudonativeIrlAnswersByUserId(id: string) {
  const where = whereUserPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVEIRL"
  );

  return await prisma.answer.count({
    where,
  });
}

export async function findUserCustomAnswersByUserId(id: string) {
  const select = selectUserCustomAnswers;
  const where = whereUserCustomAnswersByUserId(id);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function countUserCustomAnswersByUserId(id: string) {
  const where = whereUserCustomAnswersByUserId(id);

  return await prisma.answer.count({
    where,
  });
}

export async function findAnswerByUserQuestionIDAndUserID(
  userQuestionId: string,
  userId: string
) {
  const select = selectUserQuestionAnswer;
  const where = whereAnswerByUserQuestionIDAndUserID(userQuestionId, userId);

  return await prisma.answer.findUnique({
    select,
    where,
  });
}

export async function findUserPinnedNotIrlAnswersByUserId(id: string) {
  const select = selectAnswers;
  const where = whereUserPinnedNotIrlAnswersByUserId(id);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_BY_USER_ANSWERS_ORDER_BY,
    take: PINNED_BY_USER_ANSWERS_LIMIT,
  });
}

export async function findUserPinnedNotAndIrlAnswersByUserId(id: string) {
  const select = selectAnswers;
  const where = whereUserPinnedNotAndIrlAnswersByUserId(id);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_BY_USER_ANSWERS_ORDER_BY,
    take: PINNED_BY_USER_ANSWERS_LIMIT,
  });
}

// findUserNativeNotIrlAnswersByUserIdPreviewed/Queried
export async function findUserUnpinnedNativeNotIrlAnswersByUserId(id: string) {
  const select = selectAnswers;
  const where = whereUserUnpinnedNativeAnswersByUserIdAndQuestionKind(
    id,
    "NATIVE"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

// findUserPseudonativeNotIrlAnswersByUserIdPreviewed/Queried
export async function findUserUnpinnedPseudonativeNotIrlAnswersByUserId(
  id: string
) {
  const select = selectAnswers;
  const where = whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVE"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

// findUserNativeIrlAnswersByUserIdPreviewed/Queried
export async function findUserUnpinnedNativeIrlAnswersByUserId(id: string) {
  const select = selectAnswers;
  const where = whereUserUnpinnedNativeAnswersByUserIdAndQuestionKind(
    id,
    "NATIVEIRL"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

// findUserPseudonativeIrlAnswersByUserIdPreviewed/Queried
export async function findUserUnpinnedPseudonativeIrlAnswersByUserId(
  id: string
) {
  const select = selectAnswers;
  const where = whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVEIRL"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUserPinnedNotIrlAnswersByUserIdQueried(
  userId: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserPinnedNotIrlAnswersByUserIdQueried(userId, contactId);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_BY_USER_ANSWERS_ORDER_BY,
    take: PINNED_BY_USER_ANSWERS_LIMIT,
  });
}

export async function findUserPinnedNotAndIrlAnswersByUserIdQueried(
  userId: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserPinnedNotAndIrlAnswersByUserIdQueried(
    userId,
    contactId
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_BY_USER_ANSWERS_ORDER_BY,
    take: PINNED_BY_USER_ANSWERS_LIMIT,
  });
}

export async function findUserUnpinnedSharedToContactCustomAnswersQueried(
  userId: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserUnpinnedSharedToContactCustomAnswersQueried(
    userId,
    contactId
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findEmailAddressAnswerByUserId(userId: string) {
  const select = selectAnswerId;
  const where = whereEmailAddressByUserId(userId);

  return await prisma.answer.findFirst({
    select,
    where,
  });
}

export async function findUserPinnedNotIrlAnswersByUserIdExposed(
  userId: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserPinnedNotIrlAnswersByUserIdExposed(userId, contactId);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_BY_USER_ANSWERS_ORDER_BY,
    take: PINNED_BY_USER_ANSWERS_LIMIT,
  });
}

export async function findUserPinnedNotAndIrlAnswersByUserIdExposed(
  userId: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserPinnedNotAndIrlAnswersByUserIdExposed(
    userId,
    contactId
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: PINNED_BY_USER_ANSWERS_ORDER_BY,
    take: PINNED_BY_USER_ANSWERS_LIMIT,
  });
}

export async function findUserUnpinnedNativeNotIrlAnswersByUserIdExposed(
  id: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserUnpinnedNativeAnswersByUserIdAndQuestionKindExposed(
    id,
    "NATIVE",
    contactId
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUserUnpinnedPseudonativeNotIrlAnswersByUserIdExposed(
  id: string,
  contactId: string
) {
  const select = selectAnswers;
  const where =
    whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKindExposed(
      id,
      "PSEUDONATIVE",
      contactId
    );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUserUnpinnedNativeIrlAnswersByUserIdExposed(
  id: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserUnpinnedNativeAnswersByUserIdAndQuestionKindExposed(
    id,
    "NATIVEIRL",
    contactId
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUserUnpinnedPseudonativeIrlAnswersByUserIdExposed(
  id: string,
  contactId: string
) {
  const select = selectAnswers;
  const where =
    whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKindExposed(
      id,
      "PSEUDONATIVEIRL",
      contactId
    );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUserUnpinnedSharedToContactCustomAnswersExposed(
  userId: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereUserUnpinnedSharedToContactCustomAnswersExposed(
    userId,
    contactId
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findAnswerByIdAndUserId(id: string, userId: string) {
  const select = selectAnswers;
  const where = whereAnswerByIdAndUserId(id, userId);

  return await prisma.answer.findUnique({
    select,
    where,
  });
}

export async function findAnswerByIdAndContactId(
  id: string,
  contactId: string
) {
  const select = selectAnswers;
  const where = whereAnswerByIdAndContactId(id, contactId);

  return await prisma.answer.findUnique({
    select,
    where,
  });
}
