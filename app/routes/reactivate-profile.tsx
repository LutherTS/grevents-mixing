import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { updateReactivateUserById } from "~/librairies/changes/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

// could have been one common route with deactivate-profile but having two routes saves me one database round trip at this time
export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  await updateReactivateUserById(verifiedUser.id);

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
