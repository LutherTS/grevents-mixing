import { ActionFunctionArgs } from "@remix-run/node";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignInForm } from "~/components/sign-in-form";
import { createUserSession, signIn } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const usernameOrEmail = form.get("usernameoremail");
  const password = form.get("password");
  console.log(usernameOrEmail);
  console.log(password);

  if (typeof usernameOrEmail !== "string" || typeof password !== "string") {
    return null;
  }

  const signedIn = await signIn(usernameOrEmail, password);
  console.log(signedIn);

  if (!signedIn) {
    return null;
  }

  return createUserSession(
    signedIn.verifiedSignInUser.id,
    `/users/${signedIn.verifiedSignInUser.username}/dashboard`
  );
  // I think it's only the id that's going to be signed, then be used again, I shall see.
};

export default function SignInPage() {
  return (
    <>
      <H1>Welcome to the Sign In Page.</H1>
      <SignInForm />
      <PageLink href={`/sign-up`}>To sign up</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
