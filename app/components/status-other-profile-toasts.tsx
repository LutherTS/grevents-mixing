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
      {contact.statusOtherProfile === "FIRSTACCESSEDTHROUGHFIND" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          {contact.userFirst.appWideName}&apos;s profile found
        </ContactToastForm>
      )}
      {contact.statusOtherProfile === "REACCESSEDTHROUGHFIND" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          {contact.userFirst.appWideName}&apos;s profile found once more
        </ContactToastForm>
      )}
      {contact.statusOtherProfile === "HASFIRSTACCESSEDTHROUGHFIND" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
          specifiedClasses="text-orange-500 disabled:!text-gray-500"
        >
          {contact.userFirst.username} has found your profile
        </ContactToastForm>
      )}
      {contact.statusOtherProfile === "HASREACCESSEDTHROUGHFIND" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
          specifiedClasses="text-orange-500 disabled:!text-gray-500"
        >
          {contact.userFirst.username} has found your profile once more
        </ContactToastForm>
      )}
    </>
  );
}
