import { Prisma } from "@prisma/client";

export function createNativeNotIrlUserQuestionAndAnswer(
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
export function updateNativeNotIrlUserQuestionAndAnswer(
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
