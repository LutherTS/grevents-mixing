import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import {
  countUserPinnedAnswersByUserId,
  findAnswerByIdAndUserId,
} from "~/librairies/data/answers";
import { PINNED_BY_USER_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import {
  pinAnswerUserQuestionByIdAndUserId,
  unpinAnswerUserQuestionByIdAndUserId,
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

  if (answer.userQuestion.isPinned === false) {
    const userPinnedAnswersCount = await countUserPinnedAnswersByUserId(
      verifiedUser.id
    );
    if (userPinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT) {
      await pinAnswerUserQuestionByIdAndUserId(answer.id, verifiedUser.id);
    }
  }

  if (answer.userQuestion.isPinned === true) {
    await unpinAnswerUserQuestionByIdAndUserId(answer.id, verifiedUser.id);
  }

  return redirect(`/users/${answer.user.username}/personal-info`);
};

export const loader = async () => redirect("/");
