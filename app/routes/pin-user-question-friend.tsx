import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { findAnswerByIdAndContactId } from "~/librairies/data/answers";
import { findContactByIdAndUserLastId } from "~/librairies/data/contacts";
import { upsertAnswerUserQuestionFriendPinnedByFriend } from "~/librairies/changes/answers";
import { countUserQuestionFriendsAnswersPinnedByFriend } from "~/librairies/data/userquestionfriends";
import { PINNED_BY_FRIEND_ANSWERS_LIMIT } from "~/librairies/subdata/userquestionfriends";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const answerId = form.get("answerid");
  const contactId = form.get("contactid");

  if (typeof contactId !== "string" || typeof answerId !== "string") {
    return null;
  }

  const contact = await findContactByIdAndUserLastId(
    contactId,
    verifiedUser.id
  );

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
    userQuestionFriendsAnswersPinnedByFriendCount >=
    PINNED_BY_FRIEND_ANSWERS_LIMIT
  ) {
    return null;
  }

  await upsertAnswerUserQuestionFriendPinnedByFriend(
    answer.id,
    answer.userQuestion.id,
    contact.id
  );

  return null;
};

export const loader = async () => redirect("/");
