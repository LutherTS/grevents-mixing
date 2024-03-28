import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignInForm } from "~/components/sign-in-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import { SignInUserSchema } from "~/librairies/validations/users";
import {
  createVerifiedUserSession,
  getVerifiedUser,
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
  const signInPassword = form.get("signinpassword");

  const validatedFields = SignInUserSchema.safeParse({
    userUsernameOrEmail: usernameOrEmail,
    userSignInPassword: signInPassword,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Sign In User.",
      },
      { status: 400 }
    );
  }

  const { userUsernameOrEmail, userSignInPassword } = validatedFields.data;

  const verifiedSignInUser = await signIn(
    userUsernameOrEmail,
    userSignInPassword
  );

  if (!verifiedSignInUser) {
    return json(
      {
        message:
          "Database Error: Sign in failed. Please check your credentials.",
      },
      { status: 401 }
    );
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
      <p className="mt-2 text-gray-500">
        (If you&apos;ve ever forgotten your password, contact me directly or via
        email at luther@tchofo-safo-portfolio.me and I'll reset one for you.)
      </p>
      <PageLink href={`/sign-up`}>To sign up</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
