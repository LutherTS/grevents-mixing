import { prisma } from "~/utilities/db.server";
import { findUserNativeNotIrlAnswersQuestionsIdsByUserId } from "./answers";
import {
  NATIVE_QUESTION_LIMIT,
  selectUnansweredNativeQuestions,
  whereUnansweredNativeQuestionsByIdsAndKind,
} from "../subdata/questions";

// And it works, now I need it cleaned.
export async function findUnansweredNativeNotIrlQuestionsByUserId(
  userId: string
) {
  const userNativeNotIrlAnswersQuestionsIds =
    await findUserNativeNotIrlAnswersQuestionsIdsByUserId(userId);

  const result: string[] = [];
  userNativeNotIrlAnswersQuestionsIds.forEach((element) =>
    result.push(element.userQuestion.question.id)
  );

  const select = selectUnansweredNativeQuestions();
  const where = whereUnansweredNativeQuestionsByIdsAndKind(result, "NATIVE");

  return await prisma.question.findMany({
    select,
    where,
    orderBy: {
      name: "asc",
    },
    take: NATIVE_QUESTION_LIMIT,
  });
}

export async function findUnansweredNativeIrlQuestionsByUserId(
  userId: string
) {}
