import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { updateDeactivateUserById } from "~/librairies/changes/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

// could have been one route but having two routes saves me one database round trip at this time
export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  await updateDeactivateUserById(verifiedUser.id);

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
