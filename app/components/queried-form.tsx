import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { selectContacts } from "~/librairies/subdata/contacts";

export function QueriedForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

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
              placeholder="userlast"
            />
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
                placeholder="relcombo"
              />
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
