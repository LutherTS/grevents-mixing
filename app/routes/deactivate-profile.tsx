import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { updateDeactivateUserById } from "~/librairies/changes/users";
import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

// could have been one route but having two routes saves me one database round trip at this time
export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const verifiedUser = await updateDeactivateUserById(verifiedUserId);

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
