import { prisma } from "~/utilities/db.server";
import {
  ANSWERS_DEFAULT_LIMIT,
  ANSWERS_PINNED_BY_USER_LIMIT,
  selectUserCustomAnswers,
  selectUserNativeAnswers,
  selectUserPinnedAnswers,
  selectUserPseudonativeAnswers,
  whereAnswerByUserQuestionIDAndUserID,
  whereUserCustomAnswersByUserId,
  whereUserNativeAnswersByUserIdAndQuestionKind,
  whereUserPinnedAnswersByUserId,
  whereUserPseudonativeAnswersByUserIdAndUserQuestionKind,
} from "../subdata/answers";

export async function findUserPinnedAnswersByUserId(id: string) {
  const select = selectUserPinnedAnswers();
  const where = whereUserPinnedAnswersByUserId(id);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: [
      {
        userQuestion: {
          pinnedAt: "desc",
        },
      },
      {
        updatedAt: "desc",
      },
    ],
    take: ANSWERS_PINNED_BY_USER_LIMIT,
  });
}

export async function countUserPinnedAnswersByUserId(id: string) {
  const where = whereUserPinnedAnswersByUserId(id);

  return await prisma.answer.count({
    where,
  });
}

export async function findUserNativeNotIrlAnswersByUserId(id: string) {
  const select = selectUserNativeAnswers();
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVE");

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: {
      userQuestion: {
        question: {
          name: "asc",
        },
      },
    },
    take: ANSWERS_DEFAULT_LIMIT,
  });
}

export async function countUserNativeNotIrlAnswersByUserId(id: string) {
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVE");

  return await prisma.answer.count({
    where,
  });
}

export async function findUserNativeIrlAnswersByUserId(id: string) {
  const select = selectUserNativeAnswers();
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVEIRL");

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: {
      userQuestion: {
        question: {
          name: "asc",
        },
      },
    },
    take: ANSWERS_DEFAULT_LIMIT,
  });
}

export async function countUserNativeIrlAnswersByUserId(id: string) {
  const where = whereUserNativeAnswersByUserIdAndQuestionKind(id, "NATIVEIRL");

  return await prisma.answer.count({
    where,
  });
}

export async function findUserPseudonativeNotIrlAnswersByUserId(id: string) {
  const select = selectUserPseudonativeAnswers();
  const where = whereUserPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVE"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: {
      userQuestion: {
        question: {
          name: "asc",
        },
      },
    },
    take: ANSWERS_DEFAULT_LIMIT,
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
  const select = selectUserPseudonativeAnswers();
  const where = whereUserPseudonativeAnswersByUserIdAndUserQuestionKind(
    id,
    "PSEUDONATIVEIRL"
  );

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: {
      userQuestion: {
        question: {
          name: "asc",
        },
      },
    },
    take: ANSWERS_DEFAULT_LIMIT,
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
  const select = selectUserCustomAnswers();
  const where = whereUserCustomAnswersByUserId(id);

  return await prisma.answer.findMany({
    select,
    where,
    orderBy: {
      userQuestion: {
        question: {
          name: "asc",
        },
      },
    },
    take: ANSWERS_DEFAULT_LIMIT,
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
  const select = selectUserCustomAnswers();
  const where = whereAnswerByUserQuestionIDAndUserID(userQuestionId, userId);

  return await prisma.answer.findUnique({
    select,
    where,
  });
}
