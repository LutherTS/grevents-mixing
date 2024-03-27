import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

type AppWideNameUserByHand = JsonifyObject<{
  errors?: {
    userAppWideName?: string[];
  };
}>;

export function AppWideNameForm({ appWideName }: { appWideName: string }) {
  const fetcher = useFetcher<AppWideNameUserByHand>();

  return (
    <>
      <fetcher.Form
        action="/modify-app-wide-name"
        method="post"
        className="mt-2"
      >
        <label htmlFor="app-wide-name">
          <p>Change your app-wide name here</p>
        </label>
        <input
          className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
          type="text"
          id="app-wide-name"
          name="appwidename"
          placeholder={appWideName}
          disabled={fetcher.state !== "idle"}
        />
        {fetcher.data?.errors?.userAppWideName ? (
          <div id="app-wide-name-error" aria-live="polite">
            {fetcher.data.errors.userAppWideName.map((error) => (
              <p className="mt-2 text-red-500 font-light" key={error}>
                {error}
              </p>
            ))}
          </div>
        ) : null}
      </fetcher.Form>
    </>
  );
}
