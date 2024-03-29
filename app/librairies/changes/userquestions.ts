import { prisma } from "~/utilities/server/db.server";
import { whereUserQuestionAtUserIdAndQuestionId } from "../subdata/userquestions";
import {
  createUserQuestionAndAnswer,
  updateUserQuestionAndAnswer,
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

export async function upsertUserQuestionAndAnswerByUserIdQuestionIdValueAndKind(
  userId: string,
  questionId: string,
  value: string,
  kind?: string
) {
  const where = whereUserQuestionAtUserIdAndQuestionId(userId, questionId);
  const create = createUserQuestionAndAnswer(userId, questionId, value, kind);
  const update = updateUserQuestionAndAnswer(userId, questionId, value, kind);

  return await prisma.userQuestion.upsert({
    where,
    create,
    update,
  });
}
