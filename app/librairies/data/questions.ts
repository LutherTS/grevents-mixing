import { prisma } from "~/utilities/server/db.server";
import {
  DEFAULT_QUESTIONS_ORDER_BY,
  ARBITRARY_QUESTIONS_LIMIT,
  selectUnansweredNativeQuestions,
  whereUnansweredNativeQuestionsByUserIdAndKind,
  wherePseudoQuestionByName,
} from "../subdata/questions";

const orderBy = DEFAULT_QUESTIONS_ORDER_BY;

const take = ARBITRARY_QUESTIONS_LIMIT;

export async function findUnansweredNativeNotIrlQuestionsByUserId(
  userId: string
) {
  const select = selectUnansweredNativeQuestions;
  const where = whereUnansweredNativeQuestionsByUserIdAndKind(userId, "NATIVE");

  return await prisma.question.findMany({
    select,
    where,
    orderBy,
    take,
  });
}

export async function findUnansweredNativeIrlQuestionsByUserId(userId: string) {
  const select = selectUnansweredNativeQuestions;
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

// Because select and where have one entry, I'm not making subdatas for this.
export async function findQuestionById(id: string) {
  const select = { id: true };
  const where = { id };

  return await prisma.question.findUnique({
    select,
    where,
  });
}

export async function findPseudoQuestionByName(name: string) {
  const select = { id: true };
  const where = wherePseudoQuestionByName(name);

  return await prisma.question.findUnique({
    select,
    where,
  });
}
