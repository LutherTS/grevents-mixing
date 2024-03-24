import { prisma } from "~/utilities/server/db.server";
import { whereUserQuestionAtUserIdAndQuestionId } from "../subdata/userquestions";
import {
  createNativeNotIrlUserQuestionAndAnswer,
  updateNativeNotIrlUserQuestionAndAnswer,
} from "../subchanges/userquestions";

export async function deleteUserQuestionAtUserIdAndQuestionId(
  userId: string,
  questionId: string
) {
  const where = whereUserQuestionAtUserIdAndQuestionId(userId, questionId);

  return await prisma.userQuestion.delete({
    where,
  });
}

export async function upsertNativeNotIrlUserQuestionAndAnswerByUserIdQuestionIdAndValue(
  userId: string,
  questionId: string,
  value: string
) {
  const where = whereUserQuestionAtUserIdAndQuestionId(userId, questionId);
  const create = createNativeNotIrlUserQuestionAndAnswer(
    userId,
    questionId,
    value
  );
  const update = updateNativeNotIrlUserQuestionAndAnswer(
    userId,
    questionId,
    value
  );

  return await prisma.userQuestion.upsert({
    where,
    create,
    update,
  });
}
