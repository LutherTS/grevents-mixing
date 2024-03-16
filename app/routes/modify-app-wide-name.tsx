import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUserAppWideNameById } from "~/librairies/changes/users";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const appWideName = form.get("appwidename");

  if (typeof appWideName !== "string") {
    return null;
  }

  const verifiedUser = await updateUserAppWideNameById(
    verifiedUserId,
    appWideName
  );

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
