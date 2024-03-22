import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";
import {
  findUserQuestionFriendByIdAndContactUserFirstId,
  findUserQuestionFriendByIdAndContactUserLastId,
} from "~/librairies/data/userquestionfriends";
import { updateUserQuestionFriendCancelPinnedByFriend } from "~/librairies/changes/userquestionfriends";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }
  console.log(verifiedUserId);

  const form = await request.formData();
  const userQuestionFriendId = form.get("userquestionfriendid");

  if (typeof userQuestionFriendId !== "string") {
    return null;
  }
  console.log(userQuestionFriendId);

  const userQuestionFriend =
    await findUserQuestionFriendByIdAndContactUserLastId(
      userQuestionFriendId,
      verifiedUserId
    );

  if (!userQuestionFriend) {
    return null;
  }
  console.log(userQuestionFriend);

  // await updateUserQuestionFriendCancelPinnedByFriend(
  //   userQuestionFriend.id,
  //   verifiedUserId
  // );

  return null;
};

export const loader = async () => redirect("/");
