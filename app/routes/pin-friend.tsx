import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { updatePinFriendbyUserIdAndContactId } from "~/librairies/changes/users";
import { findContactByIdAndUserLastId } from "~/librairies/data/contacts";
import { defineContactRelCombo } from "~/utilities/contacts";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const contactId = form.get("contactid");

  if (typeof contactId !== "string") {
    return null;
  }

  const contact = await findContactByIdAndUserLastId(
    contactId,
    verifiedUser.id
  );

  if (!contact?.mirror) {
    return null;
  }

  const relCombo = defineContactRelCombo(contact);

  console.log(contact.mirror.userFirst.id);
  console.log(contact.id);

  if (relCombo === "friend" || relCombo === "irl") {
    await updatePinFriendbyUserIdAndContactId(
      contact.mirror.userFirst.id,
      contact.id
    );
  }

  return redirect(`/users/${contact.mirror.userFirst.username}/dashboard`);
};

export const loader = async () => redirect("/");
