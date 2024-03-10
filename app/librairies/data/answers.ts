import { prisma } from "~/utilities/db.server";

export const ANSWERS_PINNED_BY_USER_LIMIT = 16;

export async function findUserPinnedAnswersByUserId(id: string) {
  return await prisma.answer.findMany({
    select: {
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
    },
    where: {
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
    },
    orderBy: [
      {
        userQuestion: {
          pinnedAt: "desc",
        },
      },
      {
        updatedAt: "desc",
      },
    ],
    take: ANSWERS_PINNED_BY_USER_LIMIT,
  });
}

export async function countUserPinnedAnswersByUserId(id: string) {
  const whereObj = whereObject(id);
  return await prisma.answer.count({
    where: whereObj,
  });
}
// This "where" I just copied... I could literally turn it into...
// not an object, but a function. And if I'm clever, I could actually refactor a whole lot of the 2000+ lines of raw Postgres queries I used to have.

/* Nope
const whereObject = {
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
}
*/

/* Yup ? */
const whereObject = (id: string) => {
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
/* YUP. I DIDN'T KNOW THAT COULD BE POSSIBLE. */
