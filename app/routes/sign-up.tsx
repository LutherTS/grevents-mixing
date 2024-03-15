import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignUpForm } from "~/components/sign-up-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  createVerifiedUserSession,
  getVerifiedUser,
  signUp,
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
  const username = form.get("username");
  const appWideName = form.get("appwidename");
  const email = form.get("email");
  const signUpPassword = form.get("signuppassword");
  const confirmPassword = form.get("confirmpassword");
  console.log(username);
  console.log(appWideName);
  console.log(email);
  console.log(signUpPassword);
  console.log(confirmPassword);

  if (
    typeof username !== "string" ||
    typeof appWideName !== "string" ||
    typeof email !== "string" ||
    typeof signUpPassword !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return null;
  }

  const verifiedSignUpUser = await signUp(
    username,
    appWideName,
    email,
    signUpPassword,
    confirmPassword
  );
  console.log(verifiedSignUpUser);

  if (!verifiedSignUpUser) {
    return null;
  }

  return createVerifiedUserSession(
    verifiedSignUpUser.id,
    `/users/${verifiedSignUpUser.username}/dashboard`
  );
};

export default function SignUpPage() {
  return (
    <>
      <H1>Welcome to the Sign Up Page.</H1>
      <SignUpForm />
      <PageLink href={`/sign-in`}>To sign in</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
