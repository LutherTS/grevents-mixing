import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

type EmailUserByHand = JsonifyObject<{
  errors?: {
    userEmail?: string[];
  };
  message: string;
}>;

export function EmailForm({ email }: { email: string }) {
  const fetcher = useFetcher<EmailUserByHand>();

  return (
    <>
      <fetcher.Form action="/modify-email" method="post" className="mt-2">
        <label htmlFor="email">
          <p>Change your email here</p>
        </label>
        <input
          className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
          type="text"
          id="email"
          name="email"
          placeholder={email}
          disabled={fetcher.state !== "idle"}
        />
        {fetcher.data?.errors?.userEmail ? (
          <div id="email-error" aria-live="polite">
            {fetcher.data.errors.userEmail.map((error) => (
              <p className="mt-2 text-red-500 font-light" key={error}>
                {error}
              </p>
            ))}
          </div>
        ) : null}
        {fetcher.data?.message ? (
          <div id="email-form-error" aria-live="polite">
            <p className="mt-2 text-red-500">{fetcher.data.message}</p>
          </div>
        ) : null}
      </fetcher.Form>
    </>
  );
}
