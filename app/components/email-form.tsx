import { useFetcher } from "@remix-run/react";

export function EmailForm({ email }: { email: string }) {
  const fetcher = useFetcher();

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
      </fetcher.Form>
    </>
  );
}
