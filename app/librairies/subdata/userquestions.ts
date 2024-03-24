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
    answer: {
      state: "LIVE",
    },
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

export function whereDeletableUserQuestionByUserIdAndQuestionId(
  userId: string,
  questionId: string
): Prisma.UserQuestionWhereUniqueInput {
  return {
    userId_questionId: {
      userId,
      questionId,
    },
    NOT: [{ state: "LIVE" }, { state: "HIDDEN" }],
  };
}

export function whereDeletableUserQuestionAnswerByUserIdAndQuestionId(
  userId: string,
  questionId: string
): Prisma.UserQuestionWhereUniqueInput {
  return {
    userId_questionId: {
      userId,
      questionId,
    },
    answer: {
      NOT: {
        state: "LIVE",
      },
    },
  };
}
