import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";
import { findAnswerByIdAndUserId } from "~/librairies/data/answers";
import { findContactByIdAndUserFirstId } from "~/librairies/data/contacts";
import { upsertAnswerUserQuestionFriendSharedToFriend } from "~/librairies/changes/answers";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const contactId = form.get("contactid");
  const answerId = form.get("answerid");

  if (typeof contactId !== "string" || typeof answerId !== "string") {
    return null;
  }

  const answer = await findAnswerByIdAndUserId(answerId, verifiedUserId);

  if (!answer) {
    return null;
  }

  const contact = await findContactByIdAndUserFirstId(
    contactId,
    verifiedUserId
  );

  if (!contact) {
    return null;
  }

  await upsertAnswerUserQuestionFriendSharedToFriend(
    answer.id,
    verifiedUserId,
    answer.userQuestion.id,
    contact.id
  );

  return null;
};

export const loader = async () => redirect("/");
