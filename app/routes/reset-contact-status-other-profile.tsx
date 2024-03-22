import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { updateContactStatusOtherProfileById } from "~/librairies/changes/contacts";
import { findContactByIdAndUserLastId } from "~/librairies/data/contacts";
import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const contactId = form.get("contactid");

  if (typeof contactId !== "string") {
    return null;
  }

  const contact = await findContactByIdAndUserLastId(contactId, verifiedUserId);

  if (!contact?.mirror) {
    return null;
  }

  await updateContactStatusOtherProfileById(contact.id);

  return null;
};

export const loader = async () => redirect("/");
