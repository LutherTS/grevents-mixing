import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

import { FormButton } from "./form-button";
import { SignInput } from "./sign-input";

type SignInUserByHand = JsonifyObject<{
  errors?: {
    userUsernameOrEmail?: string[];
    userSignInPassword?: string[];
  };
  message: string;
}>;

export function SignInForm() {
  const fetcher = useFetcher<SignInUserByHand>();

  return (
    <>
      <fetcher.Form method="post" className="mb-4 flex flex-col items-center">
        <fieldset disabled={fetcher.state !== "idle"}>
          <label htmlFor="username-or-email">
            <p className="mt-4">Username or email *</p>
          </label>
          <SignInput
            id="username-or-email"
            name="usernameoremail"
            placeholder="Enter your username or your email"
          />
          {fetcher.data?.errors?.userUsernameOrEmail ? (
            <div id="username-or-email-error" aria-live="polite">
              {fetcher.data.errors.userUsernameOrEmail.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="sign-in-password">
            <p className="mt-4">Password *</p>
          </label>
          <SignInput
            id="sign-in-password"
            name="signinpassword"
            placeholder="Enter your password"
            specifiedType="password"
          />
          {fetcher.data?.errors?.userSignInPassword ? (
            <div id="password-error" aria-live="polite">
              {fetcher.data.errors.userSignInPassword.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {fetcher.data?.message ? (
            <div id="sign-in-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
          <FormButton>Sign in</FormButton>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
