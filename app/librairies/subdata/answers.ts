import { Prisma } from "@prisma/client";

// select n'a pas besoin d'être une fonction, et si je nomme bien mes where, ils n'ont pas besoin d'être des fonctions non... si quand même. Ce qui sont mappés demeurent des arguments.

// same as questions at this time but nested
export const DEFAULT_ANSWERS_ORDER_BY = {
  userQuestion: {
    question: {
      name: "asc",
    },
  },
} satisfies Prisma.AnswerOrderByWithRelationInput;

export const PINNED_BY_USER_ANSWERS_ORDER_BY = [
  {
    userQuestion: {
      pinnedAt: "desc",
    },
  },
  {
    updatedAt: "desc",
  },
] satisfies Prisma.AnswerOrderByWithRelationInput[];

export const DEFAULT_ANSWERS_LIMIT = 32;
export const PINNED_BY_USER_ANSWERS_LIMIT = 16;

// would eventually be shifted to ./userquestions.ts
export const isNative = {
  question: {
    kind: "NATIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

// would eventually be shifted to ./userquestions.ts
export const isPseudoNative = {
  kind: "PSEUDONATIVE",
  question: {
    kind: "PSEUDO",
  },
} satisfies Prisma.UserQuestionWhereInput;

// would eventually be shifted to ./userquestions.ts
export const isNativeIrl = {
  question: {
    kind: "NATIVEIRL",
  },
} satisfies Prisma.UserQuestionWhereInput;

// would eventually be shifted to ./userquestions.ts
export const isPseudoNativeIrl = {
  kind: "PSEUDONATIVEIRL",
  question: {
    kind: "PSEUDO",
  },
} satisfies Prisma.UserQuestionWhereInput;

export const selectUserPinnedAnswers = {
  userQuestion: {
    select: {
      isPinned: true,
      kind: true,
      id: true,
      question: {
        select: {
          name: true,
          kind: true,
        },
      },
      _count: {
        select: {
          userQuestionFriends: {
            where: {
              isSharedToFriend: true,
            },
          },
        },
      },
    },
  },
  value: true,
  id: true,
  user: {
    select: {
      username: true,
      id: true,
    },
  },
} satisfies Prisma.AnswerSelect;

export function whereUserPinnedAnswersByUserId(id: string) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        state: "LIVE",
      },
      isPinned: true,
      state: "LIVE",
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}

export const selectUserNativeAnswers = {
  userQuestion: {
    select: {
      isPinned: true,
      kind: true,
      id: true,
      state: true,
      question: {
        select: {
          name: true,
          kind: true,
          id: true,
        },
      },
    },
  },
  value: true,
  id: true,
  user: {
    select: {
      username: true,
      id: true,
    },
  },
} satisfies Prisma.AnswerSelect;

export function whereUserNativeAnswersByUserIdAndQuestionKind(
  id: string,
  kind: string
) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        kind,
        state: "LIVE",
      },
      state: "LIVE" || "HIDDEN",
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}

export const selectUserPseudonativeAnswers = {
  userQuestion: {
    select: {
      question: {
        select: {
          name: true,
          kind: true,
        },
      },
      isPinned: true,
      kind: true,
      id: true,
    },
  },
  value: true,
  id: true,
  user: {
    select: {
      username: true,
      id: true,
    },
  },
} satisfies Prisma.AnswerSelect;

export function whereUserPseudonativeAnswersByUserIdAndUserQuestionKind(
  id: string,
  kind: string
) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        kind: "PSEUDO",
        state: "LIVE",
      },
      kind,
      state: "LIVE",
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}

// currently the same as selectUserPinnedAnswers
export const selectUserCustomAnswers = {
  userQuestion: {
    select: {
      isPinned: true,
      id: true,
      question: {
        select: {
          name: true,
          kind: true,
        },
      },
      _count: {
        select: {
          userQuestionFriends: {
            where: {
              isSharedToFriend: true,
            },
          },
        },
      },
    },
  },
  value: true,
  id: true,
  user: {
    select: {
      username: true,
      id: true,
    },
  },
} satisfies Prisma.AnswerSelect;

// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind, with kind as "CUSTOM", and with userQuestion.state as "LIVE" only instead of "LIVE" || "HIDDEN"
export function whereUserCustomAnswersByUserId(id: string) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        kind: "CUSTOM",
        state: "LIVE",
      },
      state: "LIVE",
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}

// currently the same as selectUserCustomAnswers, without userQuestion.isPinned
export const selectUserCustomAnswer = {
  userQuestion: {
    select: {
      id: true,
      question: {
        select: {
          name: true,
          kind: true,
        },
      },
      _count: {
        select: {
          userQuestionFriends: {
            where: {
              isSharedToFriend: true,
            },
          },
        },
      },
    },
  },
  value: true,
  id: true,
  user: {
    select: {
      username: true,
      id: true,
    },
  },
} satisfies Prisma.AnswerSelect;

export function whereAnswerByUserQuestionIDAndUserID(
  userQuestionId: string,
  userId: string
) {
  // : Prisma.AnswerWhereUniqueInput
  return {
    userQuestionId,
    userId,
    state: "LIVE",
    userQuestion: {
      state: "LIVE",
      question: {
        state: "LIVE",
      },
    },
    user: {
      state: "LIVE" || "DEACTIVATED",
    },
  };
}

export const selectAnswers = {
  userQuestion: {
    select: {
      id: true,
      kind: true,
      question: {
        select: {
          name: true,
          kind: true,
        },
      },
    },
  },
  value: true,
  id: true,
  user: {
    select: {
      username: true,
      id: true,
    },
  },
} satisfies Prisma.AnswerSelect;

// currently the same as whereUserPinnedAnswersByUserId with OR [isNative, isPseudoNative]
export function whereUserPinnedNotIrlAnswersByUserId(id: string) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        state: "LIVE",
      },
      isPinned: true,
      state: "LIVE",
      OR: [isNative, isPseudoNative],
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}

// currently the same as whereUserPinnedAnswersByUserId with OR [isNative, isPseudoNative, isNativeIrl, isPseudonativeIrl]
export function whereUserPinnedNotAndIrlAnswersByUserId(id: string) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        state: "LIVE",
      },
      isPinned: true,
      state: "LIVE",
      OR: [isNative, isPseudoNative, isNativeIrl, isPseudoNativeIrl],
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}

// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind with userQuestion.isPinned as false and without "HIDDEN" on userQuestion.state
export function whereUserUnpinnedNativeAnswersByUserIdAndQuestionKind(
  id: string,
  kind: string
) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: false,
      question: {
        kind,
        state: "LIVE",
      },
      state: "LIVE",
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}

// currently the same as whereUserPseudonativeAnswersByUserIdAndUserQuestionKind with userQuestion.isPinned as false
export function whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKind(
  id: string,
  kind: string
) {
  // : Prisma.AnswerWhereInput
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: false,
      question: {
        kind: "PSEUDO",
        state: "LIVE",
      },
      kind,
      state: "LIVE",
    },
    user: {
      id,
      state: "LIVE" || "DEACTIVATED",
    },
    state: "LIVE",
  };
}
