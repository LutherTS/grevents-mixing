import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import {
  countUserQuestionFriendsAnswersPinnedOfFriends,
  countUserQuestionFriendsAnswersPinnedOfFriendsDeactivated,
  findUserQuestionFriendByIdAndContactUserLastId,
} from "~/librairies/data/userquestionfriends";
import { PINNED_OF_FRIENDS_ANSWERS_LIMIT } from "~/librairies/subdata/userquestionfriends";
import { updateUserQuestionFriendPinnedOfFriends } from "~/librairies/changes/userquestionfriends";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const userQuestionFriendId = form.get("userquestionfriendid");

  if (typeof userQuestionFriendId !== "string") {
    return null;
  }

  const userQuestionFriend =
    await findUserQuestionFriendByIdAndContactUserLastId(
      userQuestionFriendId,
      verifiedUser.id
    );

  if (!userQuestionFriend?.userQuestion.answer) {
    return null;
  }

  const [
    userQuestionFriendsAnswersPinnedOfFriendsCount,
    userQuestionFriendsAnswersPinnedOfFriendsDeactivatedCount,
  ] = await Promise.all([
    countUserQuestionFriendsAnswersPinnedOfFriends(
      userQuestionFriend.contact.userLast.id
    ),
    countUserQuestionFriendsAnswersPinnedOfFriendsDeactivated(
      userQuestionFriend.contact.userLast.id
    ),
  ]);

  // There's a weakness here that can be abused by a friend deactivating their account so that the user can pin more criteria from other friends, then reactivate their account. But at that time it will simply be a clear sign that PINNED_OF_FRIENDS_ANSWERS_LIMIT should highered.
  if (
    userQuestionFriendsAnswersPinnedOfFriendsCount -
      userQuestionFriendsAnswersPinnedOfFriendsDeactivatedCount >=
    PINNED_OF_FRIENDS_ANSWERS_LIMIT
  ) {
    return null;
  }

  await updateUserQuestionFriendPinnedOfFriends(userQuestionFriend.id);

  return redirect(
    `/users/${userQuestionFriend.contact.userLast.username}/dashboard`
  );
};

export const loader = async () => redirect("/");
