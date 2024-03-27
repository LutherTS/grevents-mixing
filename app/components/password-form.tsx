import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

import { FormButton } from "./form-button";

type PasswordUserByHand = JsonifyObject<{
  errors?: {
    userSignInPassword?: string[];
    userPassword?: string[];
    userConfirmPassword?: string[];
  };
  message: string;
}>;

export function PasswordForm() {
  const fetcher = useFetcher<PasswordUserByHand>();

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
            className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
            type="password"
            id="old-password"
            name="oldpassword"
          />
          {fetcher.data?.errors?.userSignInPassword ? (
            <div id="old-password-error" aria-live="polite">
              {fetcher.data.errors.userSignInPassword.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="new-password">
            <p className="mt-2">New password *</p>
          </label>
          <input
            className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
            type="password"
            id="new-password"
            name="newpassword"
          />
          {fetcher.data?.errors?.userPassword ? (
            <div id="new-password-error" aria-live="polite">
              {fetcher.data.errors.userPassword.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="confirm-new-password">
            <p className="mt-2">Confirm new password *</p>
          </label>
          <input
            className="mt-2 w-[32ch] max-w-[40ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
            type="password"
            id="confirm-new-password"
            name="confirmnewpassword"
          />
          {fetcher.data?.errors?.userConfirmPassword ? (
            <div id="confirm-password-error" aria-live="polite">
              {fetcher.data.errors.userConfirmPassword.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {fetcher.data?.message ? (
            <div id="sign-up-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
          <FormButton>Modify password</FormButton>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
