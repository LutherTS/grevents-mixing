import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignInForm } from "~/components/sign-in-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  createVerifiedUserSession,
  getVerifiedUser,
  kickOut,
  signIn,
} from "~/utilities/server/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (verifiedUser) {
    await updateUserStatusDashboardById(
      verifiedUser.id,
      "REDIRECTEDTODASHBOARD"
    );
    throw redirect(`/users/${verifiedUser.username}/dashboard`);
  }

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const usernameOrEmail = form.get("usernameoremail");
  const signinpassword = form.get("signinpassword");

  if (
    typeof usernameOrEmail !== "string" ||
    typeof signinpassword !== "string"
  ) {
    return null;
  }

  const verifiedSignInUser = await signIn(usernameOrEmail, signinpassword);

  if (!verifiedSignInUser) {
    return null;
  }

  return createVerifiedUserSession(
    verifiedSignInUser.id,
    `/users/${verifiedSignInUser.username}/dashboard`
  );
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
