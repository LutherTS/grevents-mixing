import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import uid from "uid2";

import { updateUserFriendCodeById } from "~/librairies/changes/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const newFriendCode = uid(12);

  await updateUserFriendCodeById(verifiedUser.id, newFriendCode);

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
