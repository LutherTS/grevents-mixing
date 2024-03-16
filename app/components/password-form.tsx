import { useFetcher } from "@remix-run/react";
import { FormButton } from "./form-button";

export function PasswordForm() {
  const fetcher = useFetcher();

  return (
    <>
      <p className="mt-8 mb-4 font-semibold">Change your password below</p>
      <fetcher.Form action="/modify-password" method="post" className="mt-2">
        {/* first try on disabled for the whole fieldset */}
        <fieldset disabled={fetcher.state !== "idle"}>
          <label htmlFor="old-password">
            <p>Old password *</p>
          </label>
          <input
            className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white sm:w-[40ch]"
            type="password"
            id="old-password"
            name="oldpassword"
          />
          <label htmlFor="new-password">
            <p className="mt-2">New password *</p>
          </label>
          <input
            className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white sm:w-[40ch]"
            type="password"
            id="new-password"
            name="newpassword"
          />
          <label htmlFor="confirm-new-password">
            <p className="mt-2">Confirm new password *</p>
          </label>
          <input
            className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white sm:w-[40ch]"
            type="password"
            id="confirm-new-password"
            name="confirmnewpassword"
          />
          <FormButton>Modify password</FormButton>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
