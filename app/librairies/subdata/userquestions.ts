import { Prisma } from "@prisma/client";

export const selectPrexistingUserQuestion = {
  id: true,
  kind: true,
  state: true,
  question: {
    select: {
      kind: true,
      state: true,
    },
  },
  answer: {
    select: {
      state: true,
    },
  },
} satisfies Prisma.UserQuestionSelect;

export function whereUserQuestionByUserIdAndQuestionId(
  userId: string,
  questionId: string
): Prisma.UserQuestionWhereUniqueInput {
  return {
    userId_questionId: {
      userId,
      questionId,
    },
    user: {
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    question: {
      state: "LIVE",
    },
    OR: [{ state: "LIVE" }, { state: "HIDDEN" }],
  };
}

export function whereUserQuestionAtUserIdAndQuestionId(
  userId: string,
  questionId: string
): Prisma.UserQuestionWhereUniqueInput {
  return {
    userId_questionId: {
      userId,
      questionId,
    },
  };
}
