import { prisma } from "~/utilities/server/db.server";
import { dataCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind } from "../subchanges/questions";

export async function createCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
  name: string,
  value: string,
  userId: string,
  kind?: string
) {
  const data = dataCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
    name,
    value,
    userId,
    kind
  );

  return await prisma.question.create({
    data,
  });
}
