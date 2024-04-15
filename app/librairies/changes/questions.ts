import { prisma } from "~/utilities/server/db.server";
import {
  dataCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind,
  dataSourcedCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind,
} from "../subchanges/questions";

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

export async function createSourcedCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
  source: string,
  name: string,
  value: string,
  userId: string,
  kind?: string
) {
  const data =
    dataSourcedCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
      source,
      name,
      value,
      userId,
      kind
    );

  return await prisma.question.create({
    data,
  });
}
