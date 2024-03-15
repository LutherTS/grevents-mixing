import { Form } from "@remix-run/react";

import { FormButton } from "./form-button";
import { SignInput } from "./sign-input";

export function SignUpForm() {
  return (
    <>
      <Form method="post" className="mb-4 flex flex-col items-center">
        <label htmlFor="username">
          <p className="mt-4">Username *</p>
        </label>
        <SignInput
          id="username"
          name="username"
          placeholder="Enter your username"
        />
        <label htmlFor="app-wide-name">
          <p className="mt-4">App-wide name *</p>
        </label>
        <SignInput
          id="app-wide-name"
          name="appwidename"
          placeholder="Enter your app-wide name"
        />
        <label htmlFor="email">
          <p className="mt-4">Email *</p>
        </label>
        <SignInput id="email" name="email" placeholder="Enter your email" />
        <label htmlFor="sign-up-password">
          <p className="mt-4">Password *</p>
        </label>
        <SignInput
          id="sign-up-password"
          name="signuppassword"
          placeholder="Enter your password"
          specifiedType="password"
        />
        <label htmlFor="confirm-password">
          <p className="mt-4">Confirm password *</p>
        </label>
        <SignInput
          id="confirm-password"
          name="confirmpassword"
          placeholder="Confirm your password"
          specifiedType="password"
        />
        <FormButton>Sign in</FormButton>
      </Form>
    </>
  );
}
