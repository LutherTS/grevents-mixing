import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import uid from "uid2";

import { updateUserFriendCodeById } from "~/librairies/changes/users";
import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const newFriendCode = uid(12);

  const verifiedUser = await updateUserFriendCodeById(
    verifiedUserId,
    newFriendCode
  );

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
