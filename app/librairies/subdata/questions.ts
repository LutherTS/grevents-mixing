import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const NATIVE_QUESTION_LIMIT = 16;

export function selectUnansweredNativeQuestions() {
  // : Prisma.QuestionSelect<DefaultArgs>
  return {
    name: true,
    kind: true,
    id: true,
  };
}

/* There's going to be a need for another query from which I get the ids of the questions I've answered, maybe them into an array, and put them at notIn.
 */
export function whereUnansweredNativeQuestionsByIdsAndKind2(
  answeredNativeQuestionsIds: string[],
  kind: string
) {
  // : Prisma.QuestionWhereInput
  return {
    kind,
    id: {
      notIn: answeredNativeQuestionsIds,
    },
    state: "LIVE",
  };
}

export function whereUnansweredNativeQuestionsByIdsAndKind(
  userId: string,
  kind: string
): Prisma.QuestionWhereInput {
  return {
    kind,
    state: "LIVE",
    userQuestions: {
      none: {
        userId,
        state: "LIVE",
        answer: {
          state: "LIVE",
        },
      },
    },
  };
}
