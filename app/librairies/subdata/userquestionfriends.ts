import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { isFriend, isIrl } from "./contacts";

export function selectUserQuestionFriends() {
  // : Prisma.UserQuestionFriendSelect<DefaultArgs>
  return {
    id: true,
    contact: {
      select: {
        userLast: {
          select: {
            appWideName: true,
            username: true,
            state: true,
          },
        },
      },
    },
  };
}

export function whereUserQuestionFriendsByUserQuestionId(
  userQuestionId: string
) {
  // : Prisma.UserQuestionFriendWhereInput
  return {
    userQuestionId,
    isSharedToFriend: true,
    state: "LIVE",
    contact: {
      state: "LIVE",
      userFirst: {
        state: "LIVE" || "DEACTIVATED",
      },
      mirror: {
        state: "LIVE",
      },
    },
    OR: [
      {
        contact: isFriend,
      },
      {
        contact: isIrl,
      },
    ],
  };
}
