import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { selectVerifiedUser } from "~/librairies/subdata/users";

export function FindForm({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: typeof selectVerifiedUser;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form method="post" className="mt-2">
        <label htmlFor="friend-code">
          <p>Find a user by their friend code.</p>
        </label>
        <input
          className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
          type="text"
          id="friend-code"
          name="friendcode"
          placeholder="Enter a user's friend code"
          disabled={fetcher.state !== "idle" || user.state === "DEACTIVATED"}
        />
        {user.state === "DEACTIVATED" && (
          <p className="mt-2 text-red-500">
            You can&apos;t use the find feature while your profile is
            deactivated.
          </p>
        )}
      </fetcher.Form>
    </>
  );
}
