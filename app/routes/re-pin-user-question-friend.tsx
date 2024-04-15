import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { findUserQuestionFriendByIdAndContactUserLastId } from "~/librairies/data/userquestionfriends";
import {
  updateUserQuestionFriendRePinnedByFriendDashboard,
  updateUserQuestionFriendRePinnedByFriendProfile,
} from "~/librairies/changes/userquestionfriends";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const userQuestionFriendId = form.get("userquestionfriendid");
  const pathname = form.get("pathname");

  if (
    typeof userQuestionFriendId !== "string" ||
    typeof pathname !== "string"
  ) {
    return null;
  }

  const userQuestionFriend =
    await findUserQuestionFriendByIdAndContactUserLastId(
      userQuestionFriendId,
      verifiedUser.id
    );

  if (!userQuestionFriend) {
    return null;
  }

  if (
    pathname ===
    `/users/${userQuestionFriend.userQuestion.answer?.user.username}/profile`
  )
    await updateUserQuestionFriendRePinnedByFriendProfile(
      userQuestionFriend.id,
      verifiedUser.id
    );

  if (
    pathname ===
    `/users/${userQuestionFriend.contact.userLast.username}/dashboard`
  )
    await updateUserQuestionFriendRePinnedByFriendDashboard(
      userQuestionFriend.id,
      verifiedUser.id
    );

  return null;
};

export const loader = async () => redirect("/");
