import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";
import { findAnswerByIdAndUserId } from "~/librairies/data/answers";
import {
  hideAnswerUserQuestionByIdAndUserId,
  revealAnswerUserQuestionByIdAndUserId,
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

  const answer = await findAnswerByIdAndUserId(answerId, verifiedUserId);

  if (!answer) {
    return null;
  }

  if (answer.userQuestion.state === "LIVE") {
    await hideAnswerUserQuestionByIdAndUserId(answer.id, verifiedUserId);
  }

  if (answer.userQuestion.state === "HIDDEN") {
    await revealAnswerUserQuestionByIdAndUserId(answer.id, verifiedUserId);
  }

  return redirect(`/users/${answer.user.username}/personal-info/standardized`);
};

export const loader = async () => redirect("/");
