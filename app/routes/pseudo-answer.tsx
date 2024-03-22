import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";
import {
  countUserPinnedAnswersByUserId,
  countUserPseudonativeIrlAnswersByUserId,
  countUserPseudonativeNotIrlAnswersByUserId,
  findAnswerByIDAndUserID,
} from "~/librairies/data/answers";
import {
  DEFAULT_ANSWERS_LIMIT,
  PINNED_BY_USER_ANSWERS_LIMIT,
} from "~/librairies/subdata/answers";
import {
  pinAnswerUserQuestionByIdAndUserId,
  pseudoIrlAnswerUserQuestionByIdAndUserId,
  pseudoNotIrlAnswerUserQuestionByIdAndUserId,
  unpinAnswerUserQuestionByIdAndUserId,
} from "~/librairies/changes/answers";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const answerId = form.get("answerid");

  if (typeof answerId !== "string") {
    return null;
  }

  const answer = await findAnswerByIDAndUserID(answerId, verifiedUserId);

  if (!answer) {
    return null;
  }

  if (answer.userQuestion.kind === "PSEUDONATIVE") {
    const userPseudonativeIrlAnswersCount =
      await countUserPseudonativeIrlAnswersByUserId(verifiedUserId);
    if (userPseudonativeIrlAnswersCount < DEFAULT_ANSWERS_LIMIT) {
      await pseudoIrlAnswerUserQuestionByIdAndUserId(answer.id, verifiedUserId);
    }
  }

  if (answer.userQuestion.kind === "PSEUDONATIVEIRL") {
    const userPseudonativeNotIrlAnswersCount =
      await countUserPseudonativeNotIrlAnswersByUserId(verifiedUserId);
    if (userPseudonativeNotIrlAnswersCount < DEFAULT_ANSWERS_LIMIT) {
      await pseudoNotIrlAnswerUserQuestionByIdAndUserId(
        answer.id,
        verifiedUserId
      );
    }
  }

  return null;
};

export const loader = async () => redirect("/");
