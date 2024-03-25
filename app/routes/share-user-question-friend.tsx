import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { findAnswerByIdAndUserId } from "~/librairies/data/answers";
import { findContactByIdAndUserFirstId } from "~/librairies/data/contacts";
import { upsertAnswerUserQuestionFriendSharedToFriend } from "~/librairies/changes/answers";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const contactId = form.get("contactid");
  const answerId = form.get("answerid");

  if (typeof contactId !== "string" || typeof answerId !== "string") {
    return null;
  }

  const answer = await findAnswerByIdAndUserId(answerId, verifiedUser.id);

  if (!answer) {
    return null;
  }

  const contact = await findContactByIdAndUserFirstId(
    contactId,
    verifiedUser.id
  );

  if (!contact?.mirror) {
    return null;
  }

  await upsertAnswerUserQuestionFriendSharedToFriend(
    answer.id,
    verifiedUser.id,
    answer.userQuestion.id,
    contact.id
  );

  return null;
};

export const loader = async () => redirect("/");
