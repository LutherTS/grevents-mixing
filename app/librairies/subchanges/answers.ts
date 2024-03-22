import { Prisma } from "@prisma/client";

export function dataSignUpUserEmailAddressAnswer(
  value: string,
  id: string
): Prisma.AnswerCreateInput {
  return {
    state: "LIVE",
    value,
    userQuestion: {
      create: {
        state: "LIVE",
        user: {
          connect: {
            id,
          },
        },
        question: {
          connect: {
            kind_name: {
              kind: "NATIVE",
              name: "Email address",
            },
          },
        },
      },
    },
    user: {
      connect: {
        id,
      },
    },
  };
}

export function dataPinAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        isPinned: true,
        pinnedAt: new Date(),
      },
    },
    user: {
      update: {
        statusPersonalInfo: "CRITERIAPINNED",
      },
    },
  };
}

export function dataUnpinAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        isPinned: false,
        pinnedAt: null,
      },
    },
    user: {
      update: {
        statusPersonalInfo: "CRITERIAUNPINNED",
      },
    },
  };
}

export function dataPseudoIrlAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        kind: "PSEUDONATIVEIRL",
      },
    },
    user: {
      update: {
        statusPersonalInfo: "PSEUDONATIVECRITERIAUPPEDTOIRL",
      },
    },
  };
}

export function dataPseudoNotIrlAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        kind: "PSEUDONATIVE",
      },
    },
    user: {
      update: {
        statusPersonalInfo: "PSEUDONATIVECRITERIADOWNEDFROMIRL",
      },
    },
  };
}

export function dataUpsertAnswerUserQuestionFriendSharedToFriend(
  userQuestionId: string,
  contactId: string
): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        userQuestionFriends: {
          upsert: {
            where: {
              userQuestionId_contactId: { userQuestionId, contactId },
            },
            create: {
              isSharedToFriend: true,
              sharedToFriendAt: new Date(),
              state: "LIVE",
              contactId,
            },
            update: {
              isSharedToFriend: true,
              sharedToFriendAt: new Date(),
              state: "LIVE",
            },
          },
        },
      },
    },
    user: {
      update: {
        statusPersonalInfo: "USERQUESTIONFRIENDSHARED",
      },
    },
  };
}

// contact here has verifiedUser as userLast
export function dataUpsertAnswerUserQuestionFriendPinnedByFriend(
  userQuestionId: string,
  contactId: string,
  userFirstId: string,
  userLastId: string
): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        userQuestionFriends: {
          upsert: {
            where: {
              userQuestionId_contactId: { userQuestionId, contactId },
            },
            create: {
              isPinnedByFriend: true,
              pinnedByFriendAt: new Date(),
              state: "LIVE",
              contactId,
            },
            update: {
              isPinnedByFriend: true,
              pinnedByFriendAt: new Date(),
              state: "LIVE",
            },
          },
        },
      },
    },
    user: {
      update: {
        contactLasts: {
          update: {
            where: {
              userFirstId_userLastId: {
                userFirstId,
                userLastId,
              },
            },
            data: {
              statusOtherProfile: "USERQUESTIONFRIENDPINNED",
            },
          },
        },
      },
    },
  };
}
