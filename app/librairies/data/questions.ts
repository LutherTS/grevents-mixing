import { prisma } from "~/utilities/db.server";
import {
  NATIVE_QUESTION_LIMIT,
  selectUnansweredNativeQuestions,
  whereUnansweredNativeQuestionsByUserIdAndKind,
} from "../subdata/questions";

export async function findUnansweredNativeNotIrlQuestionsByUserId(
  userId: string
) {
  const select = selectUnansweredNativeQuestions();
  const where = whereUnansweredNativeQuestionsByUserIdAndKind(userId, "NATIVE");

  return await prisma.question.findMany({
    select,
    where,
    orderBy: {
      name: "asc",
    },
    take: NATIVE_QUESTION_LIMIT,
  });
}

export async function findUnansweredNativeIrlQuestionsByUserId(userId: string) {
  const select = selectUnansweredNativeQuestions();
  const where = whereUnansweredNativeQuestionsByUserIdAndKind(
    userId,
    "NATIVEIRL"
  );

  return await prisma.question.findMany({
    select,
    where,
    orderBy: {
      name: "asc",
    },
    take: NATIVE_QUESTION_LIMIT,
  });
}
