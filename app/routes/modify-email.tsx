import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUserEmailByIdAndAnswerId } from "~/librairies/changes/users";
import { findEmailAddressAnswerByUserId } from "~/librairies/data/answers";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const email = form.get("email");

  if (typeof email !== "string") {
    return null;
  }

  const verifiedUserEmailAddressAnswer = await findEmailAddressAnswerByUserId(
    verifiedUser.id
  );

  if (!verifiedUserEmailAddressAnswer) {
    return null;
  }

  await updateUserEmailByIdAndAnswerId(
    verifiedUser.id,
    email,
    verifiedUserEmailAddressAnswer.id
  );

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
