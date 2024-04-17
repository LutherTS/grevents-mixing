import { Prisma } from "@prisma/client";

export function createUserQuestionAndAnswer(
  userId: string,
  questionId: string,
  value: string,
  kind?: string
): Prisma.UserQuestionUncheckedCreateInput {
  return {
    userId,
    questionId,
    state: "LIVE",
    kind: kind || "NONE",
    answer: {
      create: {
        value,
        state: "LIVE",
        userId,
      },
    },
  };
}

export function updateUserQuestionAndAnswer(
  userId: string,
  questionId: string,
  value: string,
  kind?: string
): Prisma.UserQuestionUncheckedUpdateInput {
  return {
    userId,
    questionId,
    state: "LIVE",
    kind: kind || "NONE",
    answer: {
      update: {
        value,
        state: "LIVE",
        userId,
      },
    },
  };
}

export function createSourcedUserQuestionAndAnswer(
  source: string, // the only property added
  userId: string,
  questionId: string,
  value: string,
  kind?: string
): Prisma.UserQuestionUncheckedCreateInput {
  return {
    userId,
    questionId,
    state: "LIVE",
    kind: kind || "NONE",
    answer: {
      create: {
        value,
        source, // the only property added
        state: "LIVE",
        userId,
      },
    },
  };
}

export function updateSourcedUserQuestionAndAnswer(
  source: string, // the only property added
  userId: string,
  questionId: string,
  value: string,
  kind?: string
): Prisma.UserQuestionUncheckedUpdateInput {
  return {
    userId,
    questionId,
    state: "LIVE",
    kind: kind || "NONE",
    answer: {
      update: {
        value,
        source, // the only property added
        state: "LIVE",
        userId,
      },
    },
  };
}
