import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  await updateUserStatusDashboardById(verifiedUserId);

  return null;
};

export const loader = async () => redirect("/");