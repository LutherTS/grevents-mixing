import { ActionFunctionArgs } from "@remix-run/node";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignInForm } from "~/components/sign-in-form";
import { signIn } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const usernameOrEmail = form.get("usernameoremail");
  const password = form.get("password");
  console.log(usernameOrEmail);
  console.log(password);

  if (typeof usernameOrEmail !== "string" || typeof password !== "string") {
    return null;
  }

  const verifiedSignInUser = await signIn(usernameOrEmail, password);
  console.log(verifiedSignInUser);

  return verifiedSignInUser;
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
