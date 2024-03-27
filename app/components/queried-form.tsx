import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
// import { JsonifyObject } from "type-fest/source/jsonify";

import { selectContacts } from "~/librairies/subdata/contacts";
import { relationCombinations } from "~/utilities/contacts";

// type QueriedUserByHand = JsonifyObject<{
//   errors?: {
//     userOtherUsername?: string[];
//     contactRelCombo?: string[];
//   };
// }>;

export function QueriedForm({
  contact,
  userLast,
  relCombo,
}: {
  contact:
    | Prisma.ContactGetPayload<{
        select: typeof selectContacts;
      }>
    | null
    | undefined;
  userLast?: string;
  relCombo?: string;
}) {
  const fetcher = useFetcher();
  // <QueriedUserByHand>

  return (
    <>
      <fetcher.Form method="post" className="mt-2">
        <fieldset disabled={fetcher.state !== "idle"} className="space-y-4">
          <div>
            <label htmlFor="user-last">
              <p>Type the username of a user you are acquainted with.</p>
            </label>
            <input
              className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
              type="text"
              id="user-last"
              name="userlast"
              placeholder={
                userLast && relCombo && relationCombinations.includes(relCombo)
                  ? userLast
                  : "userlast"
              }
            />
            {/* {fetcher.data?.errors?.userOtherUsername ? (
              <div id="user-last-error" aria-live="polite">
                {fetcher.data.errors.userOtherUsername.map((error) => (
                  <p className="mt-2 text-red-500 font-light" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            ) : null} */}
            {/* {contact === null ? (
              <div id="user-last-error" aria-live="polite">
                <p className="mt-2 text-red-500 font-light">
                  You aren&apos;t acquainted with any such other user.
                </p>
              </div>
            ) : null} */}
          </div>
          {contact && (
            <div>
              <label htmlFor="rel-combo">
                <p>
                  Type a relation combination between you and this user you've
                  selected. (none, friend, irl, i-am-blocking, has-me-blocked,
                  blocking-blocked)
                </p>
              </label>
              <input
                className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
                type="text"
                id="rel-combo"
                name="relcombo"
                placeholder={relCombo ? relCombo : "relcombo"}
              />
              {/* {fetcher.data?.errors?.contactRelCombo ? (
                <div id="rel-combo-error" aria-live="polite">
                  {fetcher.data.errors.contactRelCombo.map((error) => (
                    <p className="mt-2 text-red-500 font-light" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              ) : null} */}
              {/* Currently necessary to send the full form via Enter */}
              <button type="submit" className="hidden">
                Submit
              </button>
            </div>
          )}
        </fieldset>
      </fetcher.Form>
    </>
  );
}
