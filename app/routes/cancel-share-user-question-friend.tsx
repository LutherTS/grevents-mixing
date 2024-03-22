import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";
import { upsertAnswerUserQuestionFriendSharedToFriend } from "~/librairies/changes/answers";
import { findUserQuestionFriendByIdAndContactUserFirstId } from "~/librairies/data/userquestionfriends";
import { updateUserQuestionFriendCancelSharedToFriend } from "~/librairies/changes/userquestionfriends";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const userQuestionFriendId = form.get("userquestionfriendid");

  if (typeof userQuestionFriendId !== "string") {
    return null;
  }

  const userQuestionFriend =
    await findUserQuestionFriendByIdAndContactUserFirstId(
      userQuestionFriendId,
      verifiedUserId
    );

  if (!userQuestionFriend) {
    return null;
  }

  await updateUserQuestionFriendCancelSharedToFriend(
    userQuestionFriend.id,
    verifiedUserId
  );

  return null;
};

export const loader = async () => redirect("/");
