import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const ANSWERS_PINNED_BY_USER_LIMIT = 16;
export const ANSWERS_DEFAULT_LIMIT = 32;

export const selectUserPinnedAnswers = (): Prisma.AnswerSelect<DefaultArgs> => {
  return {
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
  };
};

export const whereUserPinnedAnswersByUserId = (
  id: string
): Prisma.AnswerWhereInput => {
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
};

export const selectUserNativeAnswers = (): Prisma.AnswerSelect<DefaultArgs> => {
  return {
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
  };
};

export const whereUserNativeAnswersByUserIdAndQuestionKind = (
  id: string,
  kind: string
): Prisma.AnswerWhereInput => {
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
};

export const selectUserPseudonativeAnswers =
  (): Prisma.AnswerSelect<DefaultArgs> => {
    return {
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
    };
  };

export const whereUserPseudonativeAnswersByUserIdAndUserQuestionKind = (
  id: string,
  kind: string
): Prisma.AnswerWhereInput => {
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
};

// currently the same as selectUserPinnedAnswers
export const selectUserCustomAnswers = (): Prisma.AnswerSelect<DefaultArgs> => {
  return {
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
  };
};

// currently the same as whereUserNativeAnswersByUserIdAndQuestionKind, with kind as "CUSTOM", and with userQuestion.state as "LIVE" only instead of "LIVE" || "HIDDEN"
export const whereUserCustomAnswersByUserId = (
  id: string
): Prisma.AnswerWhereInput => {
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
};