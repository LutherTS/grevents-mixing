import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";
import { findAnswerByIdAndContactId } from "~/librairies/data/answers";
import { findContactByIdAndUserLastId } from "~/librairies/data/contacts";
import { upsertAnswerUserQuestionFriendPinnedByFriend } from "~/librairies/changes/answers";
import { countUserQuestionFriendsAnswersPinnedByFriend } from "~/librairies/data/userquestionfriends";
import { PINNED_BY_FRIEND_ANSWERS_LIMIT } from "~/librairies/subdata/userquestionfriends";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const answerId = form.get("answerid");
  const contactId = form.get("contactid");

  if (typeof contactId !== "string" || typeof answerId !== "string") {
    return null;
  }

  const contact = await findContactByIdAndUserLastId(contactId, verifiedUserId);

  if (!contact?.mirror) {
    return null;
  }

  const answer = await findAnswerByIdAndContactId(answerId, contact.id);

  if (!answer) {
    return null;
  }

  const userQuestionFriendsAnswersPinnedByFriendCount =
    await countUserQuestionFriendsAnswersPinnedByFriend(
      answer.user.id,
      contact.id
    );

  if (
    userQuestionFriendsAnswersPinnedByFriendCount <
    PINNED_BY_FRIEND_ANSWERS_LIMIT
  ) {
    await upsertAnswerUserQuestionFriendPinnedByFriend(
      answer.id,
      verifiedUserId,
      answer.userQuestion.id,
      contact.id,
      contact.userFirst.id,
      contact.mirror?.userFirst.id
    );
  }

  return null;
};

export const loader = async () => redirect("/");
