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

// In a form (server) action, I can bind from the server the entire answer object, making it so I do not need to call the database again to verify, here, if it's pinned or not. With a (normal) action, I can only send the id as a string and then operate through the database from there.
// If I'm being honest, even if the (server) action has the full data, it's actually bogus because it will always need to be verified, since there's no guarantee that at the time when the action is made, the data would not have priorily changed.
// If, as you must, you verify that data within the function, then the time gap for that data to changed between verification and mutation becomes too humanly small for there to have been a human usage error.
export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  // I think it's best that I get the id from the answer, and then operation from the selectAnswers, so that I don't need to create addition flows, only to adapt the ones I already use
  const answerId = form.get("answerid");
  console.log(answerId);

  if (typeof answerId !== "string") {
    return null;
  }

  const answer = await findAnswerByIDAndUserID(answerId, verifiedUserId);

  if (!answer) {
    return null;
  }

  if (answer.userQuestion.isPinned === false) {
    console.log(false);
    const userPinnedAnswersCount = await countUserPinnedAnswersByUserId(
      verifiedUserId
    );
    console.log(userPinnedAnswersCount);
    if (userPinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT) {
      // pin
      await pinAnswerUserQuestionByIdAndUserId(answer.id, verifiedUserId);
    }
  }

  if (answer.userQuestion.isPinned === true) {
    console.log(true);
    // unpin
    await unpinAnswerUserQuestionByIdAndUserId(answer.id, verifiedUserId);
  }

  // OK that works, now I just need the toasts,
  // and when done I'll be needing to test the PINNED_BY_USER_ANSWERS_LIMIT.

  return redirect(`/users/${answer.user.username}/personal-info`);
};

export const loader = async () => redirect("/");
