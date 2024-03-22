import { Prisma } from "@prisma/client";

import { DEFAULT_QUESTIONS_ORDER_BY } from "./questions";

export type UnionAnswerType =
  | Prisma.AnswerGetPayload<{
      select: typeof selectUserPinnedAnswers;
    }>[]
  | Prisma.AnswerGetPayload<{
      select: typeof selectAnswers;
    }>[]
  | Prisma.AnswerGetPayload<{
      select: typeof selectUserNativeAnswers;
    }>[]
  | Prisma.AnswerGetPayload<{
      select: typeof selectUserPseudonativeAnswers;
    }>[]
  | Prisma.AnswerGetPayload<{
      select: typeof selectUserCustomAnswers;
    }>[];

export type GlobalAnswerTypeByHand = {
  id: string;
  value: string;
  userQuestion: {
    id: string;
    state?: string;
    kind: string;
    isPinned?: boolean;
    question: {
      kind: string;
      name: string;
    };
    _count?: {
      userQuestionFriends: number;
    };
  };
  user: {
    id: string;
    username: string;
  };
};

export const DEFAULT_ANSWERS_ORDER_BY = {
  userQuestion: {
    question: DEFAULT_QUESTIONS_ORDER_BY,
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
  state: "LIVE",
  question: {
    kind: "NATIVE",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

// would eventually be shifted to ./userquestions.ts
export const isPseudoNative = {
  kind: "PSEUDONATIVE",
  state: "LIVE",
  question: {
    kind: "PSEUDO",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

// would eventually be shifted to ./userquestions.ts
export const isNativeIrl = {
  state: "LIVE",
  question: {
    kind: "NATIVEIRL",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

// would eventually be shifted to ./userquestions.ts
export const isPseudoNativeIrl = {
  kind: "PSEUDONATIVEIRL",
  state: "LIVE",
  question: {
    kind: "PSEUDO",
    state: "LIVE",
  },
} satisfies Prisma.UserQuestionWhereInput;

// would eventually be shifted to ./userquestions.ts
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

// would eventually be shifted to ./userquestions.ts
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

export function whereUserPinnedAnswersByUserId(
  id: string
): Prisma.AnswerWhereInput {
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
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    OR: [{ state: "LIVE" }, { state: "HIDDEN" }],
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
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        kind,
        state: "LIVE",
      },
      OR: [{ state: "LIVE" }, { state: "HIDDEN" }],
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
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
): Prisma.AnswerWhereInput {
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
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
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
      kind: true, // keeping for should be "NONE"
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

// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind, with kind as "CUSTOM", with userQuestion.state as "LIVE" only instead of OR: [{ state: "LIVE" }, { state: "HIDDEN" }]
export function whereUserCustomAnswersByUserId(
  id: string
): Prisma.AnswerWhereInput {
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
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as selectUserCustomAnswers, without userQuestion.isPinned
export const selectUserCustomAnswer = {
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
): Prisma.AnswerWhereUniqueInput {
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
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
  };
}

export const selectAnswers = {
  userQuestion: {
    select: {
      id: true,
      kind: true,
      isPinned: true,
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
export function whereUserPinnedNotIrlAnswersByUserId(
  id: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: true,
      OR: [isNative, isPseudoNative],
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserPinnedAnswersByUserId with OR [isNative, isPseudoNative, isNativeIrl, isPseudonativeIrl]
export function whereUserPinnedNotAndIrlAnswersByUserId(
  id: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: true,
      OR: [isNative, isPseudoNative, isNativeIrl, isPseudoNativeIrl],
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// whereUserNativeAnswersByUserIdAndQuestionKindPreviewed/Queried
// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind with userQuestion.isPinned as false, without "HIDDEN" on userQuestion.state
export function whereUserUnpinnedNativeAnswersByUserIdAndQuestionKind(
  id: string,
  kind: string
): Prisma.AnswerWhereInput {
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
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// whereUserPseudonativeAnswersByUserIdAndQuestionKindPreviewed/Queried
// currently the same as whereUserPseudonativeAnswersByUserIdAndUserQuestionKind with userQuestion.isPinned as false
export function whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKind(
  id: string,
  kind: string
): Prisma.AnswerWhereInput {
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
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserPinnedAnswersByUserId with OR [isNative, isPseudoNative, isSharedToContactCustom]
export function whereUserPinnedNotIrlAnswersByUserIdQueried(
  id: string,
  contactId: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: true,
      OR: [isNative, isPseudoNative, isSharedToContactCustom(contactId)],
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserPinnedAnswersByUserId with OR [isNative, isPseudoNative, isNativeIrl, isPseudonativeIrl, isSharedToContactCustom]
export function whereUserPinnedNotAndIrlAnswersByUserIdQueried(
  id: string,
  contactId: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: true,
      OR: [
        isNative,
        isPseudoNative,
        isNativeIrl,
        isPseudoNativeIrl,
        isSharedToContactCustom(contactId),
      ],
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind, with kind as "CUSTOM", with userQuestion.state as "LIVE" only instead of OR: [{ state: "LIVE" }, { state: "HIDDEN" }], with userQuestion.isPinned as false, with AND userQuestion isSharedToContactCustom(contactId)
export function whereUserUnpinnedSharedToContactCustomAnswersQueried(
  id: string,
  contactId: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: false,
      AND: isSharedToContactCustom(contactId),
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

export const selectAnswerId = {
  id: true,
} satisfies Prisma.AnswerSelect;

export function whereEmailAddressByUserId(id: string): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      question: {
        kind: "NATIVE",
        name: "Email address",
      },
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// Profile subfunctions

// currently the same as whereUserPinnedAnswersByUserId with OR [isNative, isPseudoNative, isSharedToContactCustom], with noneIsPinnedByFriend(contactId)
export function whereUserPinnedNotIrlAnswersByUserIdExposed(
  id: string,
  contactId: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: true,
      OR: [isNative, isPseudoNative, isSharedToContactCustom(contactId)],
      AND: noneIsPinnedByFriend(contactId),
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserPinnedAnswersByUserId with OR [isNative, isPseudoNative, isNativeIrl, isPseudonativeIrl, isSharedToContactCustom], with noneIsPinnedByFriend(contactId)
export function whereUserPinnedNotAndIrlAnswersByUserIdExposed(
  id: string,
  contactId: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: true,
      OR: [
        isNative,
        isPseudoNative,
        isNativeIrl,
        isPseudoNativeIrl,
        isSharedToContactCustom(contactId),
      ],
      AND: noneIsPinnedByFriend(contactId),
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind with userQuestion.isPinned as false, without "HIDDEN" on userQuestion.state, with noneIsPinnedByFriend(contactId)
export function whereUserUnpinnedNativeAnswersByUserIdAndQuestionKindExposed(
  id: string,
  kind: string,
  contactId: string
): Prisma.AnswerWhereInput {
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
      AND: noneIsPinnedByFriend(contactId),
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserPseudonativeAnswersByUserIdAndUserQuestionKind with userQuestion.isPinned as false, with noneIsPinnedByFriend(contactId)
export function whereUserUnpinnedPseudonativeAnswersByUserIdAndUserQuestionKindExposed(
  id: string,
  kind: string,
  contactId: string
): Prisma.AnswerWhereInput {
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
      AND: noneIsPinnedByFriend(contactId),
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind, with kind as "CUSTOM", with userQuestion.state as "LIVE" only instead of OR: [{ state: "LIVE" }, { state: "HIDDEN" }], with userQuestion.isPinned as false, with AND userQuestion isSharedToContactCustom(contactId), with noneIsPinnedByFriend(contactId)
export function whereUserUnpinnedSharedToContactCustomAnswersExposed(
  id: string,
  contactId: string
): Prisma.AnswerWhereInput {
  return {
    userQuestion: {
      user: {
        id,
      },
      isPinned: false,
      AND: [
        isSharedToContactCustom(contactId),
        noneIsPinnedByFriend(contactId),
      ],
    },
    user: {
      id,
      OR: [{ state: "LIVE" }, { state: "DEACTIVATED" }],
    },
    state: "LIVE",
  };
}

export function whereAnswerByIdAndUserId(
  id: string,
  userId: string
): Prisma.AnswerWhereUniqueInput {
  return {
    id,
    userId,
  };
}

export function whereAnswerByIdAndContactId(
  id: string,
  contactId: string
): Prisma.AnswerWhereUniqueInput {
  return {
    id,
    userQuestion: {
      AND: noneIsPinnedByFriend(contactId),
    },
  };
}
