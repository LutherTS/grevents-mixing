import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUserStatusTitleById } from "~/librairies/changes/users";

import { getVerifiedUserId, signOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    // kickOut(request)
    // signOut(request)
    // though it's not supposed to be possible so
    return null;
  }

  // Let's just see what happens.
  // Will it soft reload the page on its own with the new state?
  return await updateUserStatusTitleById(verifiedUserId);
};

export const loader = async () => redirect("/");
