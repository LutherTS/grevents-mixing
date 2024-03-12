import { prisma } from "~/utilities/db.server";
import {
  findUserNativeIrlAnswersQuestionsIdsByUserId,
  findUserNativeNotIrlAnswersQuestionsIdsByUserId,
} from "./answers";
import {
  NATIVE_QUESTION_LIMIT,
  selectUnansweredNativeQuestions,
  whereUnansweredNativeQuestionsByIdsAndKind,
} from "../subdata/questions";

export async function findUnansweredNativeNotIrlQuestionsByUserId(
  userId: string
) {
  const userNativeNotIrlAnswersQuestionsIds =
    await findUserNativeNotIrlAnswersQuestionsIdsByUserId(userId);

  const select = selectUnansweredNativeQuestions();
  const where = whereUnansweredNativeQuestionsByIdsAndKind(
    // userNativeNotIrlAnswersQuestionsIds,
    userId,
    "NATIVE"
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

export async function findUnansweredNativeIrlQuestionsByUserId(userId: string) {
  const userNativeIrlAnswersQuestionsIds =
    await findUserNativeIrlAnswersQuestionsIdsByUserId(userId);

  const select = selectUnansweredNativeQuestions();
  const where = whereUnansweredNativeQuestionsByIdsAndKind(
    // userNativeIrlAnswersQuestionsIds,
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
