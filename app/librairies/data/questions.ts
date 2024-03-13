import { prisma } from "~/utilities/db.server";
import {
  DEFAULT_QUESTIONS_ORDER_BY,
  ARBITRARY_QUESTIONS_LIMIT,
  selectUnansweredNativeQuestions,
  whereUnansweredNativeQuestionsByUserIdAndKind,
} from "../subdata/questions";

const orderBy = DEFAULT_QUESTIONS_ORDER_BY;

const take = ARBITRARY_QUESTIONS_LIMIT;

export async function findUnansweredNativeNotIrlQuestionsByUserId(
  userId: string
) {
  const select = selectUnansweredNativeQuestions();
  const where = whereUnansweredNativeQuestionsByUserIdAndKind(userId, "NATIVE");

  return await prisma.question.findMany({
    select,
    where,
    orderBy,
    take,
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
    orderBy,
    take,
  });
}
