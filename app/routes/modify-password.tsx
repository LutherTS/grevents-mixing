import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";

import { updateUserPasswordById } from "~/librairies/changes/users";
import { findPasswordUserById } from "~/librairies/data/users";
import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const oldPassword = form.get("oldpassword");
  const newPassword = form.get("newpassword");
  const confirmNewPassword = form.get("confirmnewpassword");

  if (
    typeof oldPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof confirmNewPassword !== "string"
  ) {
    return null;
  }

  if (newPassword !== confirmNewPassword) {
    return null;
  }

  const passwordUser = await findPasswordUserById(verifiedUserId);

  if (!passwordUser) {
    return null;
  }

  const isCorrectPassword = await bcrypt.compare(
    oldPassword,
    passwordUser.hashedPassword
  );

  if (!isCorrectPassword) {
    return null;
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  const verifiedUser = await updateUserPasswordById(
    verifiedUserId,
    newHashedPassword
  );

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
