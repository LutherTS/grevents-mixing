import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export function selectUserQuestion() {
  // : Prisma.UserQuestionSelect<DefaultArgs>
  return {
    id: true,
  };
}

export const whereUserQuestionByIDAndUserID = (
  id: string,
  userId: string
): Prisma.UserQuestionWhereUniqueInput => {
  return {
    id,
    userId,
    question: {
      kind: "CUSTOM",
      state: "LIVE",
    },
    state: "LIVE",
    user: {
      state: "LIVE" || "DEACTIVATED",
    },
  };
};
