import { prisma } from "~/utilities/server/db.server";
import {
  selectPrexistingUserQuestion,
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
