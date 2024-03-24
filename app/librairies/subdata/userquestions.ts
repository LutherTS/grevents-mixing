import { Prisma } from "@prisma/client";

export const isNative = {
  state: "LIVE",
  question: {
    kind: "NATIVE",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

export const isPseudoNative = {
  kind: "PSEUDONATIVE",
  state: "LIVE",
  question: {
    kind: "PSEUDO",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

export const isNativeIrl = {
  state: "LIVE",
  question: {
    kind: "NATIVEIRL",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

export const isPseudoNativeIrl = {
  kind: "PSEUDONATIVEIRL",
  state: "LIVE",
  question: {
    kind: "PSEUDO",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

export const isSharedToContactCustom = (
  contactId: string
): Prisma.UserQuestionWhereInput => {
  return {
    state: "LIVE",
    question: {
      kind: "CUSTOM",
      state: "LIVE",
    },
    userQuestionFriends: {
      some: {
        contactId,
        isSharedToFriend: true,
        state: "LIVE",
      },
    },
  };
};

export const noneIsPinnedByFriend = (
  contactId: string
): Prisma.UserQuestionWhereInput => {
  return {
    userQuestionFriends: {
      none: {
        contactId,
        isPinnedByFriend: true,
        state: "LIVE",
      },
    },
  };
};

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
