import { Prisma } from "@prisma/client";

import { selectContacts } from "~/librairies/subdata/contacts";
import { PageLinkDivless } from "./page-link";

export function OneContact({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      <p className="mt-2">
        {contact.mirror?.userFirst.state === "DEACTIVATED" ? (
          <>
            <span className="font-semibold text-gray-500">
              {contact.mirror?.userFirst.appWideName}
            </span>
          </>
        ) : (
          <>
            <PageLinkDivless
              href={`/users/${contact.mirror?.userFirst.username}/profile`}
              specifiedClasses="font-semibold text-blue-500 hover:text-blue-400 dark:hover:text-blue-600"
            >
              {contact.mirror?.userFirst.appWideName}
            </PageLinkDivless>
          </>
        )}{" "}
        / {contact.mirror?.userFirst.username}
      </p>
    </>
  );
}
