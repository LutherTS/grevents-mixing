import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { updateUserAppWideNameById } from "~/librairies/changes/users";
import { AppWideNameUserSchema } from "~/librairies/validations/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const appWideName = form.get("appwidename");

  const validatedFields = AppWideNameUserSchema.safeParse({
    userAppWideName: appWideName,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { userAppWideName } = validatedFields.data;

  await updateUserAppWideNameById(verifiedUser.id, userAppWideName);

  return redirect(`/users/${verifiedUser.username}/dashboard`);
};

export const loader = async () => redirect("/");
