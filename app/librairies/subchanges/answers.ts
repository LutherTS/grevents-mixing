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

export function dataPinForSelfAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        isPinnedForSelf: true,
        pinnedForSelfAt: new Date(),
      },
    },
    user: {
      update: {
        statusDashboard: "CRITERIAPINNEDFORSELF",
      },
    },
  };
}

export function dataUnpinForSelfAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        isPinnedForSelf: false,
        pinnedForSelfAt: null,
      },
    },
    user: {
      update: {
        statusDashboard: "CRITERIAUNPINNEDFORSELF",
      },
    },
  };
}

export function dataRePinForSelfAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        isPinnedForSelf: true,
        pinnedForSelfAt: new Date(),
      },
    },
    user: {
      update: {
        statusDashboard: "CRITERIAREPINNEDFORSELF",
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

export function dataRePinAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        isPinned: true,
        pinnedAt: new Date(),
      },
    },
    user: {
      update: {
        statusPersonalInfo: "CRITERIAREPINNED",
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
        contactFirsts: {
          update: {
            where: {
              id: contactId,
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

// contact here has verifiedUser as userLast
export function dataUpsertAnswerUserQuestionFriendPinnedOfFriends(
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
              isPinnedOfFriends: true, // new
              pinnedOfFriendsAt: new Date(), // new
              state: "LIVE",
              contactId,
            },
            update: {
              isPinnedOfFriends: true, // new
              pinnedOfFriendsAt: new Date(), // new
              state: "LIVE",
            },
          },
        },
      },
    },
    user: {
      update: {
        statusDashboard: "OFFRIENDSPINNED",
      },
    },
  };
}

export function dataHideAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        state: "HIDDEN",
      },
    },
    user: {
      update: {
        statusPersonalInfo: "CRITERIAHIDDEN",
      },
    },
  };
}

export function dataRevealAnswerUserQuestion(): Prisma.AnswerUpdateInput {
  return {
    userQuestion: {
      update: {
        state: "LIVE",
      },
    },
    user: {
      update: {
        statusPersonalInfo: "CRITERIAREVEALED",
      },
    },
  };
}

export function dataUpdateAnswerValueStatusPersonalInfo(
  value: string,
  statusPersonalInfo: string,
  source?: string
): Prisma.AnswerUpdateInput {
  return {
    value,
    source: source ? source : null,
    user: {
      update: {
        statusPersonalInfo,
      },
    },
  };
}

export function dataUpdateAnswerStateDeletedStatusPersonalInfo(
  statusPersonalInfo: string
): Prisma.AnswerUpdateInput {
  return {
    state: "DELETED",
    user: {
      update: {
        statusPersonalInfo,
      },
    },
  };
}
