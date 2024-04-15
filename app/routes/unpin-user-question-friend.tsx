import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { findUserQuestionFriendByIdAndContactUserLastId } from "~/librairies/data/userquestionfriends";
import { updateUserQuestionFriendCancelPinnedByFriend } from "~/librairies/changes/userquestionfriends";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const userQuestionFriendId = form.get("userquestionfriendid");
  const pathname = form.get("pathname");
  console.log(pathname);

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

  await updateUserQuestionFriendCancelPinnedByFriend(
    userQuestionFriend.id,
    verifiedUser.id
  );

  return null;
};

export const loader = async () => redirect("/");
