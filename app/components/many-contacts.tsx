import { Prisma } from "@prisma/client";
import { useState } from "react";
import _ from "lodash";

import { selectContacts } from "~/librairies/subdata/contacts";
import { OneContact, OneContactAddable } from "./one-contact";
import { TextButtonOnClick } from "./text-button";
import { selectUserQuestionAnswer } from "~/librairies/subdata/answers";

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
    select: typeof selectUserQuestionAnswer;
  }>;
  contactComponentRequired: string;
  label: string;
  notLabel?: string;
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
        {contacts.length === 0 && notLabel && (
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
    select: typeof selectUserQuestionAnswer;
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
      <p className="mt-2 font-semibold">
        <TextButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Previous
        </TextButtonOnClick>
        &nbsp;/&nbsp;
        <TextButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === chunkedContacts.length - 1}
        >
          Next
        </TextButtonOnClick>
      </p>
    </>
  );
}
