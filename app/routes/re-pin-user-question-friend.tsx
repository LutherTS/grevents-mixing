import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { findUserQuestionFriendByIdAndContactUserLastId } from "~/librairies/data/userquestionfriends";
import { updateUserQuestionFriendRePinnedByFriend } from "~/librairies/changes/userquestionfriends";

// get the URL from the request to condition the toast
// if URL is dashboard, toast is for dashboard
// else, continue the current flow
export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  console.log(url);

  //

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

  if (!userQuestionFriend) {
    return null;
  }

  await updateUserQuestionFriendRePinnedByFriend(
    userQuestionFriend.id,
    verifiedUser.id
  );

  return null;
};

export const loader = async () => redirect("/");
