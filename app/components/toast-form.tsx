import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { selectContacts } from "~/librairies/subdata/contacts";

export function ToastForm({
  action,
  specifiedClasses,
  children,
}: {
  action: string;
  specifiedClasses?: string;
  children: React.ReactNode;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action={action} method="post" className="mb-2">
        <button
          disabled={fetcher.state !== "idle"}
          className={
            specifiedClasses
              ? specifiedClasses
              : "text-green-500 disabled:!text-gray-500"
          }
        >
          {children}
        </button>
      </fetcher.Form>
    </>
  );
}

export function ContactToastForm({
  contact,
  action,
  specifiedClasses,
  children,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  action: string;
  specifiedClasses?: string;
  children: React.ReactNode;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action={action} method="post" className="mb-2">
        <input type="hidden" name="contactid" value={contact.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className={
            specifiedClasses
              ? specifiedClasses
              : "text-green-500 disabled:!text-gray-500"
          }
        >
          {children}
        </button>
      </fetcher.Form>
    </>
  );
}
