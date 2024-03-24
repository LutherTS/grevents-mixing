import { Prisma } from "@prisma/client";

export function createNativeUserQuestionAndAnswer(
  userId: string,
  questionId: string,
  value: string
): Prisma.UserQuestionUncheckedCreateInput {
  return {
    userId,
    questionId,
    state: "LIVE",
    answer: {
      create: {
        value,
        state: "LIVE",
        userId,
      },
    },
  };
}
export function updateNativeUserQuestionAndAnswer(
  userId: string,
  questionId: string,
  value: string
): Prisma.UserQuestionUncheckedUpdateInput {
  return {
    userId,
    questionId,
    state: "LIVE",
    answer: {
      update: {
        value,
        state: "LIVE",
        userId,
      },
    },
  };
}
