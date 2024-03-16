import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUserEmailByIdAndAnswerId } from "~/librairies/changes/users";
import { findEmailAddressAnswerByUserId } from "~/librairies/data/answers";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const email = form.get("email");

  if (typeof email !== "string") {
    return null;
  }

  const verifiedUserEmailAddressAnswer = await findEmailAddressAnswerByUserId(
    verifiedUserId
  );

  if (!verifiedUserEmailAddressAnswer) {
    return null;
  }

  await updateUserEmailByIdAndAnswerId(
    verifiedUserId,
    email,
    verifiedUserEmailAddressAnswer.id
  );

  return null;
};

export const loader = async () => redirect("/");
