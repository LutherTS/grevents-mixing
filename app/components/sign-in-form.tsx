import { useActionData, useFetcher } from "@remix-run/react";

import { FormButton } from "./form-button";
import { SignInput } from "./sign-input";
import { action } from "~/routes/sign-in";

export function SignInForm() {
  const fetcher = useFetcher();
  const actionData = useActionData<typeof action>();

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
          {actionData?.errors?.userUsernameOrEmail ? (
            <div id="username-or-email-error" aria-live="polite">
              {actionData.errors.userUsernameOrEmail.map((error) => (
                <p className="mt-2 text-red-500" key={error}>
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
          {actionData?.errors?.userPassword ? (
            <div id="password-error" aria-live="polite">
              {actionData.errors.userPassword.map((error) => (
                <p className="mt-2 text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {actionData?.message ? (
            <div id="sign-in-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{actionData.message}</p>
            </div>
          ) : null}
          <FormButton>Sign in</FormButton>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
