import { Prisma } from "@prisma/client";
import { useState } from "react";
import _ from "lodash";

import { selectContacts } from "~/librairies/subdata/contacts";
import { OneContact, OneContactAddable } from "./one-contact";
import { LinkButtonOnClick } from "./link-button";
import { selectUserCustomAnswer } from "~/librairies/subdata/answers";

// For UserQuestionFriends, contacts will also be from a different payload, then I can do if contacts is from Contact, then, if contacts is from UserQuestionFriends, then.
// So it's going to be in the typing, and then as a return condition. I'll find the way.
// Edit: Given the unreliableness of Union Types, I'm gonna have to make many-userquestionfriends.tsx and one-userquestionfriends.tsx components.
export function ManyContacts({
  contacts,
  answer,
  contactComponentRequired,
  label,
  notLabel,
}: {
  contacts: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>[];
  answer?: Prisma.AnswerGetPayload<{
    select: typeof selectUserCustomAnswer;
  }>;
  contactComponentRequired: string;
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
                        {contactComponentRequired === "OneContact" && (
                          <OneContact contact={contact} />
                        )}
                        {contactComponentRequired === "OneContactAddable" &&
                          answer && (
                            <OneContactAddable
                              contact={contact}
                              answer={answer}
                            />
                          )}
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ManyPaginatedContacts
                contacts={contacts}
                contactComponentRequired={contactComponentRequired}
                answer={answer}
              />
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
  answer,
  contactComponentRequired,
}: {
  contacts: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>[];
  answer?: Prisma.AnswerGetPayload<{
    select: typeof selectUserCustomAnswer;
  }>;
  contactComponentRequired: string;
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
              {contactComponentRequired === "OneContact" && (
                <OneContact contact={contact} />
              )}
              {contactComponentRequired === "OneContactAddable" && answer && (
                <OneContactAddable contact={contact} answer={answer} />
              )}
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
