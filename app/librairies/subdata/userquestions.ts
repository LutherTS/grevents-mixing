import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const selectUserQuestion =
  (): Prisma.UserQuestionSelect<DefaultArgs> => {
    return {};
  };

export const whereUserQuestionByIDAndUserID = (
  id: string,
  userId: string
): Prisma.UserQuestionWhereUniqueInput => {
  return {
    id,
    userId,
    question: {
      kind: "CUSTOM",
    },
  };
};
