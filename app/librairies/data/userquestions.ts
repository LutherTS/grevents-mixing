import { prisma } from "~/utilities/server/db.server";
import {
  selectPrexistingUserQuestion,
  whereDeletableUserQuestionAnswerByUserIdAndQuestionId,
  whereDeletableUserQuestionByUserIdAndQuestionId,
  whereUserQuestionByUserIdAndQuestionId,
} from "../subdata/userquestions";

export async function findPreExistingUserQuestionByUserIdAndQuestionId(
  userId: string,
  questionId: string
) {
  const select = selectPrexistingUserQuestion;
  const where = whereUserQuestionByUserIdAndQuestionId(userId, questionId);

  return await prisma.userQuestion.findUnique({
    select,
    where,
  });
}

export async function findDeletablePreExistingUserQuestionAtUserIdAndQuestionId(
  userId: string,
  questionId: string
) {
  const select = selectPrexistingUserQuestion;
  const where = whereDeletableUserQuestionByUserIdAndQuestionId(
    userId,
    questionId
  );

  return await prisma.userQuestion.findUnique({
    select,
    where,
  });
}

export async function findDeletablePreExistingUserQuestionAnswerAtUserIdAndQuestionId(
  userId: string,
  questionId: string
) {
  const select = selectPrexistingUserQuestion;
  const where = whereDeletableUserQuestionAnswerByUserIdAndQuestionId(
    userId,
    questionId
  );

  return await prisma.userQuestion.findUnique({
    select,
    where,
  });
}
