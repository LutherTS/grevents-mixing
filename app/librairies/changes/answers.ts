import { prisma } from "~/utilities/server/db.server";
import {
  dataPinAnswerUserQuestion,
  dataUnpinAnswerUserQuestion,
  whereAnswerByIDAndUserID,
} from "../subdata/answers";

export async function pinAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIDAndUserID(id, userId);
  const data = dataPinAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}

export async function unpinAnswerUserQuestionByIdAndUserId(
  id: string,
  userId: string
) {
  const where = whereAnswerByIDAndUserID(id, userId);
  const data = dataUnpinAnswerUserQuestion();

  return await prisma.answer.update({
    where,
    data,
  });
}
