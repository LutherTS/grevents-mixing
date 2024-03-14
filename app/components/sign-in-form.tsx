import { Form } from "@remix-run/react";

import { FormButton } from "./form-button";
import { SignInput } from "./sign-input";

export function SignInForm() {
  return (
    <>
      <Form method="post" className="mb-4 flex flex-col items-center">
        <label htmlFor="username-or-email">
          <p className="mt-4">Username or email *</p>
        </label>
        <SignInput
          id="username-or-email"
          name="usernameoremail"
          placeholder="Enter your username or your email"
        />
        <label htmlFor="password">
          <p className="mt-4">Password *</p>
        </label>
        <SignInput
          id="password"
          name="password"
          placeholder="Enter your password"
          specifiedType="password"
        />
        <FormButton>Sign in</FormButton>
      </Form>
    </>
  );
}