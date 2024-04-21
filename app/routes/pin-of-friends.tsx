import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { upsertAnswerUserQuestionFriendPinnedOfFriends } from "~/librairies/changes/answers";
import {
  countUserQuestionFriendsAnswersPinnedOfFriends,
  findUserQuestionFriendByIdAndContactUserLastId,
} from "~/librairies/data/userquestionfriends";
import { PINNED_OF_FRIENDS_ANSWERS_LIMIT } from "~/librairies/subdata/userquestionfriends";

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

  const userQuestionFriendsAnswersPinnedOfFriendsCount =
    await countUserQuestionFriendsAnswersPinnedOfFriends(
      userQuestionFriend.contact.userLast.id
    );

  if (
    userQuestionFriendsAnswersPinnedOfFriendsCount >=
    PINNED_OF_FRIENDS_ANSWERS_LIMIT
  ) {
    return null;
  }

  await upsertAnswerUserQuestionFriendPinnedOfFriends(
    userQuestionFriend.userQuestion.answer.id,
    userQuestionFriend.userQuestion.id,
    userQuestionFriend.contact.id
  );

  return redirect(
    `/users/${userQuestionFriend.contact.userLast.username}/dashboard`
  );
};

export const loader = async () => redirect("/");
