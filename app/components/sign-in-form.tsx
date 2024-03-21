import { useFetcher } from "@remix-run/react";

import { FormButton } from "./form-button";
import { SignInput } from "./sign-input";

export function SignInForm() {
  const fetcher = useFetcher();

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
          <label htmlFor="sign-in-password">
            <p className="mt-4">Password *</p>
          </label>
          <SignInput
            id="sign-in-password"
            name="signinpassword"
            placeholder="Enter your password"
            specifiedType="password"
          />
          <FormButton>Sign in</FormButton>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
