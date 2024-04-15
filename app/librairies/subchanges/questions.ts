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

// I could refactor, but a copy with source added in the beginning feels more practical at this time.
export function dataSourcedCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
  source: string, // the only property added
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
            source, // the only property added
            state: "LIVE",
          },
        },
      },
    },
  };
}
