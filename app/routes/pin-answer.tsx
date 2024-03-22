import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";
import {
  countUserPinnedAnswersByUserId,
  findAnswerByIDAndUserID,
} from "~/librairies/data/answers";
import { PINNED_BY_USER_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import {
  pinAnswerUserQuestionByIdAndUserId,
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

  if (answer.userQuestion.isPinned === false) {
    const userPinnedAnswersCount = await countUserPinnedAnswersByUserId(
      verifiedUserId
    );
    if (userPinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT) {
      await pinAnswerUserQuestionByIdAndUserId(answer.id, verifiedUserId);
    }
  }

  if (answer.userQuestion.isPinned === true) {
    await unpinAnswerUserQuestionByIdAndUserId(answer.id, verifiedUserId);
  }

  return redirect(`/users/${answer.user.username}/personal-info`);
};

export const loader = async () => redirect("/");
