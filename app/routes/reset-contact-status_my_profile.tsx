import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { updateContactStatusOtherProfileById } from "~/librairies/changes/contacts";
import { findContactByIdAndUserLastId } from "~/librairies/data/contacts";
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

  await updateContactStatusOtherProfileById(contact.mirror.id);

  return null;
};

export const loader = async () => redirect("/");
