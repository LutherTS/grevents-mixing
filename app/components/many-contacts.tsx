import { Prisma } from "@prisma/client";
import { useState } from "react";
import _ from "lodash";

import { selectContacts } from "~/librairies/subdata/contacts";
import { OneContact } from "./one-contact";
import { LinkButtonOnClick } from "./link-button";

export function ManyContacts({
  contacts,
  label,
  notLabel,
}: {
  contacts: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>[];
  label: string;

  notLabel: string;
}) {
  return (
    <>
      <div>
        <p className="mt-2 font-semibold text-zinc-500">{label}</p>
        {contacts.length > 0 && (
          <>
            {contacts.length <= 4 ? (
              <>
                <ol>
                  {contacts.map((contact) => {
                    return (
                      <li key={contact.id}>
                        <OneContact contact={contact} />
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ManyPaginatedContacts contacts={contacts} />
            )}
          </>
        )}
        {contacts.length === 0 && (
          <>
            <p className="mt-2">{notLabel}</p>
          </>
        )}
      </div>
    </>
  );
}

function ManyPaginatedContacts({
  contacts,
}: {
  contacts: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>[];
}) {
  const chunkedContacts = _.chunk(contacts, 4);

  const [position, setPosition] = useState(0);

  function handlePreviousPosition() {
    setPosition(position - 1);
  }

  function handleNextPosition() {
    setPosition(position + 1);
  }

  return (
    <>
      <ol>
        {chunkedContacts[position].map((contact) => {
          return (
            <li key={contact.id}>
              <OneContact contact={contact} />
            </li>
          );
        })}
      </ol>
      <p className="mt-2">
        <LinkButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Previous
        </LinkButtonOnClick>
        &nbsp;/&nbsp;
        <LinkButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === chunkedContacts.length - 1}
        >
          Next
        </LinkButtonOnClick>
      </p>
    </>
  );
}
