import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { findAnswerByIdAndUserId } from "~/librairies/data/answers";
import {
  hideAnswerUserQuestionByIdAndUserId,
  revealAnswerUserQuestionByIdAndUserId,
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

  if (answer.userQuestion.state === "LIVE") {
    await hideAnswerUserQuestionByIdAndUserId(answer.id, verifiedUser.id);
  }

  if (answer.userQuestion.state === "HIDDEN") {
    await revealAnswerUserQuestionByIdAndUserId(answer.id, verifiedUser.id);
  }

  return redirect(`/users/${answer.user.username}/personal-info/standardized`);
};

export const loader = async () => redirect("/");
