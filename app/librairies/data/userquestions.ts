import { prisma } from "~/utilities/db.server";
import {
  selectUserQuestion,
  whereUserQuestionByIDAndUserID,
} from "../subdata/userquestions";

export async function findUserQuestionByIDAndUserID(
  id: string,
  userId: string
) {
  const select = selectUserQuestion();
  const where = whereUserQuestionByIDAndUserID(id, userId);

  return await prisma.userQuestion.findUnique({
    select,
    where,
  });
}
