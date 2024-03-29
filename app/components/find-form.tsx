import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

import { selectVerifiedUser } from "~/librairies/subdata/users";

type FriendCodeUserByHand = JsonifyObject<{
  errors?: {
    userOtherFriendCode?: string[];
  };
  message?: string;
}>;

export function FindForm({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: typeof selectVerifiedUser;
  }>;
}) {
  const fetcher = useFetcher<FriendCodeUserByHand>();

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
        {fetcher.data?.errors?.userOtherFriendCode ? (
          <div id="friend-code-error" aria-live="polite">
            {fetcher.data.errors.userOtherFriendCode.map((error) => (
              <p className="mt-2 text-red-500 font-light" key={error}>
                {error}
              </p>
            ))}
          </div>
        ) : null}
        {fetcher.data?.message ? (
          <div id="find-form-error" aria-live="polite">
            <p className="mt-2 text-red-500">{fetcher.data.message}</p>
          </div>
        ) : null}
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
