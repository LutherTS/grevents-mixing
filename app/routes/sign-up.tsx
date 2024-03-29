import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignUpForm } from "~/components/sign-up-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import { SignUpUserSchema } from "~/librairies/validations/users";
import { prisma } from "~/utilities/server/db.server";
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

  const validatedFields = SignUpUserSchema.safeParse({
    userUsername: username,
    userAppWideName: appWideName,
    userEmail: email,
    userPassword: signUpPassword,
    userConfirmPassword: confirmPassword,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Sign Up User.",
      },
      { status: 400 }
    );
  }

  const {
    userUsername,
    userAppWideName,
    userEmail,
    userPassword,
    userConfirmPassword,
  } = validatedFields.data;

  if (userPassword !== userConfirmPassword) {
    return json(
      {
        message:
          "Input Error: Password and password confirmation do not match.",
      },
      { status: 400 }
    );
  }

  const preExistingUserByUsername = await prisma.user.findUnique({
    select: { id: true },
    where: { username: userUsername },
  });

  if (preExistingUserByUsername) {
    return json(
      {
        message: `Database Error: Username "${userUsername}" has already been registered by another user.`,
      },
      { status: 403 }
    );
  }

  const preExistingUserByEmail = await prisma.user.findUnique({
    select: { id: true },
    where: { email: userEmail },
  });

  if (preExistingUserByEmail) {
    return json(
      {
        message: `Database Error: Email "${userEmail}" has already been registered by another user.`,
      },
      { status: 403 }
    );
  }

  const verifiedSignUpUser = await signUp(
    userUsername,
    userAppWideName,
    userEmail,
    userPassword
  );

  if (!verifiedSignUpUser) {
    return json(
      {
        message:
          "Internal Error. Please contact me at the email address below.",
        // This should never happen, but we never know.
      },
      { status: 400 }
    );
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
      <p className="mt-2 text-gray-500">
        (If you&apos;re having trouble creating an account, contact me directly
        or via email at luther@tchofo-safo-portfolio.me and I'll assist you.)
      </p>
      <PageLink href={`/sign-in`}>To sign in</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
