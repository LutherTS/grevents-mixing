import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { selectContacts } from "~/librairies/subdata/contacts";

export function QueriedForm({
  contact,
  userLast,
  relCombo,
  userLastMessage,
  relComboMessage,
}: {
  contact?: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  userLast?: string;
  relCombo?: string;
  userLastMessage?: string;
  relComboMessage?: string;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form method="post" className="mt-2">
        <fieldset disabled={fetcher.state !== "idle"} className="space-y-4">
          <div>
            <label htmlFor="user-last">
              <p className="inline-block">
                Type the username of a user you are acquainted with.
              </p>
              <p className="inline-block">
                (Send an empty response to reset the form.)
              </p>
            </label>
            <input
              className="mt-2 w-[32ch] max-w-[40ch] placeholder:truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
              type="text"
              id="user-last"
              name="userlast"
              placeholder={userLast || "userlast"}
              defaultValue={userLast || undefined}
            />
            {userLastMessage ? (
              <div id="user-last-error" aria-live="polite">
                <p className="mt-4 text-red-500">{userLastMessage}</p>
              </div>
            ) : null}
          </div>
          {contact && (
            <div>
              <label htmlFor="rel-combo">
                <p className="inline-block">
                  Type a relation combination between you and this user
                  you&apos;ve selected.
                </p>
                <p className="inline-block">
                  (none, friend, irl, i-am-blocking, has-me-blocked,
                  blocking-blocked)
                </p>
              </label>
              <input
                className="mt-2 w-[32ch] max-w-[40ch] placeholder:truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
                type="text"
                id="rel-combo"
                name="relcombo"
                placeholder={relCombo ? relCombo : "relcombo"}
                defaultValue={relCombo || undefined}
              />
              {relComboMessage ? (
                <div id="rel-combo-error" aria-live="polite">
                  <p className="mt-4 text-red-500">{relComboMessage}</p>
                </div>
              ) : null}
              {/* necessary to send the full form via Enter */}
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
