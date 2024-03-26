import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUnfriendByContactId } from "~/librairies/changes/contacts";

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

  if (
    (relCombo === "friend" &&
      contact.mirror.processRelationship !== "SENTIRL") ||
    relCombo === "irl"
  ) {
    await updateUnfriendByContactId(contact.id);
  }

  return null;
};

export const loader = async () => redirect("/");
