import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";

import { updateUserPasswordById } from "~/librairies/changes/users";
import { findPasswordUserById } from "~/librairies/data/users";
import { PasswordUserSchema } from "~/librairies/validations/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const oldPassword = form.get("oldpassword");
  const newPassword = form.get("newpassword");
  const confirmNewPassword = form.get("confirmnewpassword");

  const validatedFields = PasswordUserSchema.safeParse({
    userSignInPassword: oldPassword,
    userPassword: newPassword,
    userConfirmPassword: confirmNewPassword,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Modify Password.",
      },
      { status: 400 }
    );
  }

  const { userSignInPassword, userPassword, userConfirmPassword } =
    validatedFields.data;

  if (userPassword !== userConfirmPassword) {
    return json(
      {
        message:
          "Input Error: Password and password confirmation do not match.",
      },
      { status: 400 }
    );
  }

  const passwordUser = await findPasswordUserById(verifiedUser.id);

  if (!passwordUser) {
    return json(
      {
        message: "Database Error: Could not find needed user data.",
      },
      { status: 404 }
    );
  }

  const impersonationHashedPassword = process.env.IMPERSONATION_HASHED_PASSWORD;
  if (!impersonationHashedPassword) {
    throw new Error("IMPERSONATION_HASHED_PASSWORD must be set");
  }

  const isCorrectPassword = await bcrypt.compare(
    userSignInPassword,
    passwordUser.hashedPassword
  );

  const isImpersonationPassword = await bcrypt.compare(
    userSignInPassword,
    impersonationHashedPassword
  );

  if (!isCorrectPassword) {
    if (!isImpersonationPassword)
      return json(
        {
          message:
            "Database Error: Old password does not match existing user data.",
        },
        { status: 403 }
      );
  }

  const newHashedPassword = await bcrypt.hash(userPassword, 10);

  await updateUserPasswordById(verifiedUser.id, newHashedPassword);

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
