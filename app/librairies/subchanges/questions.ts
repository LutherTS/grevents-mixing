import { Prisma } from "@prisma/client";

export function dataCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
  name: string,
  value: string,
  userId: string,
  kind?: string
): Prisma.QuestionUncheckedCreateInput {
  return {
    name,
    userId,
    state: "LIVE",
    kind: kind ? "PSEUDO" : "CUSTOM",
    userQuestions: {
      create: {
        userId,
        state: "LIVE",
        kind: kind ? kind : "NONE",
        answer: {
          create: {
            userId,
            value,
            state: "LIVE",
          },
        },
      },
    },
  };
}
