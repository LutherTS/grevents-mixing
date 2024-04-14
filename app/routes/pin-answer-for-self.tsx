import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import {
  countUserPinnedForSelfAnswersByUserId,
  findAnswerByIdAndUserId,
} from "~/librairies/data/answers";
import { PINNED_FOR_SELF_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import {
  pinForSelfAnswerUserQuestionByIdAndUserId,
  unpinForSelfAnswerUserQuestionByIdAndUserId,
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

  if (answer.userQuestion.isPinnedForSelf === false) {
    const userPinnedForSelfAnswersCount =
      await countUserPinnedForSelfAnswersByUserId(verifiedUser.id);
    if (userPinnedForSelfAnswersCount < PINNED_FOR_SELF_ANSWERS_LIMIT) {
      await pinForSelfAnswerUserQuestionByIdAndUserId(
        answer.id,
        verifiedUser.id
      );
    }
  }

  if (answer.userQuestion.isPinnedForSelf === true) {
    await unpinForSelfAnswerUserQuestionByIdAndUserId(
      answer.id,
      verifiedUser.id
    );
  }

  return redirect(`/users/${answer.user.username}/personal-info`);
};

export const loader = async () => redirect("/");
