import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const DEFAULT_QUESTIONS_ORDER_BY = {
  name: "asc",
} as Prisma.QuestionOrderByWithRelationInput;

export const ARBITRARY_QUESTIONS_LIMIT = 16;

export function selectUnansweredNativeQuestions() {
  // : Prisma.QuestionSelect<DefaultArgs>
  return {
    name: true,
    kind: true,
    id: true,
  };
}

export function whereUnansweredNativeQuestionsByUserIdAndKind(
  userId: string,
  kind: string
) {
  // : Prisma.QuestionWhereInput
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
