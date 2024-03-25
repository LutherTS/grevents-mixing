import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import {
  countUserPseudonativeIrlAnswersByUserId,
  countUserPseudonativeNotIrlAnswersByUserId,
  findAnswerByIdAndUserId,
} from "~/librairies/data/answers";
import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import {
  pseudoIrlAnswerUserQuestionByIdAndUserId,
  pseudoNotIrlAnswerUserQuestionByIdAndUserId,
} from "~/librairies/changes/answers";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const answerId = form.get("answerid");

  if (typeof answerId !== "string") {
    return null;
  }

  const answer = await findAnswerByIdAndUserId(answerId, verifiedUser.id);

  if (!answer) {
    return null;
  }

  if (answer.userQuestion.kind === "PSEUDONATIVE") {
    const userPseudonativeIrlAnswersCount =
      await countUserPseudonativeIrlAnswersByUserId(verifiedUser.id);
    if (userPseudonativeIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
      return null;
    }

    await pseudoIrlAnswerUserQuestionByIdAndUserId(answer.id, verifiedUser.id);
  }

  if (answer.userQuestion.kind === "PSEUDONATIVEIRL") {
    const userPseudonativeNotIrlAnswersCount =
      await countUserPseudonativeNotIrlAnswersByUserId(verifiedUser.id);
    if (userPseudonativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
      return null;
    }

    await pseudoNotIrlAnswerUserQuestionByIdAndUserId(
      answer.id,
      verifiedUser.id
    );
  }

  return null;
};

export const loader = async () => redirect("/");
