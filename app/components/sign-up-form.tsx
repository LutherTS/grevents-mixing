import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

import { FormButton } from "./form-button";
import { SignInput } from "./sign-input";

type SignUpUserByHand = JsonifyObject<{
  errors?: {
    userUsername?: string[];
    userAppWideName?: string[];
    userEmail?: string[];
    userPassword?: string[];
    userConfirmPassword?: string[];
  };
  message: string;
}>;

export function SignUpForm() {
  const fetcher = useFetcher<SignUpUserByHand>();

  return (
    <>
      <fetcher.Form method="post" className="mb-4 flex flex-col items-center">
        <fieldset disabled={fetcher.state !== "idle"}>
          <label htmlFor="username">
            <p className="mt-4">Username *</p>
          </label>
          <SignInput
            id="username"
            name="username"
            placeholder="Enter your username"
          />
          {fetcher.data?.errors?.userUsername ? (
            <div id="username-error" aria-live="polite">
              {fetcher.data.errors.userUsername.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="app-wide-name">
            <p className="mt-4">App-wide name *</p>
          </label>
          <SignInput
            id="app-wide-name"
            name="appwidename"
            placeholder="Enter your app-wide name"
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
          <label htmlFor="email">
            <p className="mt-4">Email *</p>
          </label>
          <SignInput id="email" name="email" placeholder="Enter your email" />
          {fetcher.data?.errors?.userEmail ? (
            <div id="email-error" aria-live="polite">
              {fetcher.data.errors.userEmail.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="sign-up-password">
            <p className="mt-4">Password *</p>
          </label>
          <SignInput
            id="sign-up-password"
            name="signuppassword"
            placeholder="Enter your password"
            specifiedType="password"
          />
          {fetcher.data?.errors?.userPassword ? (
            <div id="sign-up-password-error" aria-live="polite">
              {fetcher.data.errors.userPassword.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="confirm-password">
            <p className="mt-4">Confirm password *</p>
          </label>
          <SignInput
            id="confirm-password"
            name="confirmpassword"
            placeholder="Confirm your password"
            specifiedType="password"
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
            <div id="sign-in-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
          <FormButton>Sign up</FormButton>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
