import { Prisma } from "@prisma/client";

export const DEFAULT_QUESTIONS_ORDER_BY = {
  name: "asc",
} satisfies Prisma.QuestionOrderByWithRelationInput;

export const ARBITRARY_QUESTIONS_LIMIT = 16;

export const selectUnansweredNativeQuestions = {
  name: true,
  kind: true,
  id: true,
} satisfies Prisma.QuestionSelect;

export function whereUnansweredNativeQuestionsByUserIdAndKind(
  userId: string,
  kind: string
): Prisma.QuestionWhereInput {
  return {
    kind,
    state: "LIVE",
    userQuestions: {
      none: {
        userId,
        state: "LIVE",
        answer: {
          state: "LIVE",
        },
      },
    },
  };
}
