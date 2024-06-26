import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { updateUserStatusTitleById } from "~/librairies/changes/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  await updateUserStatusTitleById(verifiedUser.id);

  return null;
};

export const loader = async () => redirect("/");
