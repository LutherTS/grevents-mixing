import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { selectContacts } from "~/librairies/subdata/contacts";
import { PageLinkDivless } from "./page-link";
import { selectUserCustomAnswer } from "~/librairies/subdata/answers";

export function OneContact({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        <p>
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
      </div>
    </>
  );
}

// This didn't need to be a new component. But for now, I want to develop a similar structure than the one I did for answers.
export function OneContactAddable({
  contact,
  answer,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  answer: Prisma.AnswerGetPayload<{
    select: typeof selectUserCustomAnswer;
  }>;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        <ButtonShareUserQuestionFriendForm contact={contact} answer={answer} />
        <p>
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
      </div>
    </>
  );
}

export function ButtonShareUserQuestionFriendForm({
  contact,
  answer,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  answer: Prisma.AnswerGetPayload<{
    select: typeof selectUserCustomAnswer;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/share-user-question-friend"
        method="post"
        className="me-2 flex items-center"
      >
        <input type="hidden" name="contactid" value={contact.id} />
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className="h-4 w-4 rounded-full bg-cyan-500 hover:bg-cyan-300 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-cyan-700"
        />
      </fetcher.Form>
    </>
  );
}
