import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { selectContacts } from "~/librairies/subdata/contacts";
import { PageLinkDivless } from "./page-link";
import { selectUserQuestionAnswer } from "~/librairies/subdata/answers";

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
    select: typeof selectUserQuestionAnswer;
  }>;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        {/* old */}
        {/* <ButtonShareUserQuestionFriendForm contact={contact} answer={answer} /> */}
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
      {/* new */}
      <p className="mt-2">
        <TextButtonShareUserQuestionFriendForm
          contact={contact}
          answer={answer}
        />
      </p>
    </>
  );
}

function TextButtonShareUserQuestionFriendForm({
  contact,
  answer,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  answer: Prisma.AnswerGetPayload<{
    select: typeof selectUserQuestionAnswer;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/share-user-question-friend" method="post">
        <input type="hidden" name="contactid" value={contact.id} />
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className="disabled:!text-gray-500 disabled:hover:!text-gray-500 text-sky-500 hover:text-sky-300 dark:hover:text-sky-700"
        >
          Share to {contact.mirror?.userFirst.appWideName}
        </button>
      </fetcher.Form>
    </>
  );
}

/* ARCHIVES
All previous buttons will be kept as comments below. And their implementation will still remain in the code above as comments, until I manage to find a solution the problem I showcased here: https://play.tailwindcss.com/ID2X1qT2KU.
*/

// function ButtonShareUserQuestionFriendForm({
//   contact,
//   answer,
// }: {
//   contact: Prisma.ContactGetPayload<{
//     select: typeof selectContacts;
//   }>;
//   answer: Prisma.AnswerGetPayload<{
//     select: typeof selectUserQuestionAnswer;
//   }>;
// }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <fetcher.Form
//         action="/share-user-question-friend"
//         method="post"
//         className="me-2 flex items-center"
//       >
//         <input type="hidden" name="contactid" value={contact.id} />
//         <input type="hidden" name="answerid" value={answer.id} />
//         <button
//           disabled={fetcher.state !== "idle"}
//           className="h-4 w-4 rounded-full bg-cyan-500 hover:bg-cyan-300 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-cyan-700"
//         />
//       </fetcher.Form>
//     </>
//   );
// }
