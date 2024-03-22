import { Prisma } from "@prisma/client";
import { ContactToastForm } from "./toast-form";
import { selectContacts } from "~/librairies/subdata/contacts";

export function StatusOtherProfileToasts({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      {contact.statusOtherProfile === "USERQUESTIONFRIENDPINNED" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          Friend criteria pinned by you
        </ContactToastForm>
      )}
      {contact.statusOtherProfile === "USERQUESTIONFRIENDUNPINNED" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          Friend criteria unpinned by you
        </ContactToastForm>
      )}
    </>
  );
}
