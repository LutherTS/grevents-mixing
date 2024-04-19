import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { updateUserEmailByIdAndAnswerId } from "~/librairies/changes/users";
import { findEmailAddressAnswerByUserId } from "~/librairies/data/answers";
import { EmailUserSchema } from "~/librairies/validations/users";
import { prisma } from "~/utilities/server/db.server";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const email = form.get("email");

  const validatedFields = EmailUserSchema.safeParse({
    userEmail: email,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { userEmail } = validatedFields.data;

  const preExistingUserByEmail = await prisma.user.findUnique({
    select: { id: true },
    where: { email: userEmail },
  });

  if (preExistingUserByEmail) {
    return json(
      {
        message: `Database Error: Email "${userEmail}" has already been registered by another user.`,
      },
      { status: 403 }
    );
  }

  const verifiedUserEmailAddressAnswer = await findEmailAddressAnswerByUserId(
    verifiedUser.id
  );

  if (!verifiedUserEmailAddressAnswer) {
    return json(
      {
        message:
          "Database Error: Could not find previous email address answer.",
      },
      { status: 404 }
    );
  }

  await updateUserEmailByIdAndAnswerId(
    verifiedUser.id,
    userEmail,
    verifiedUserEmailAddressAnswer.id
  );

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
