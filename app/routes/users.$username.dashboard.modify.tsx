import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { AppWideNameForm } from "~/components/app-wide-name-form";
import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { DeactivateReactivateForms } from "~/components/deactivate-forms";
import { EmailForm } from "~/components/email-form";
import { FriendCodeForm } from "~/components/friend-code-form";
import { H1 } from "~/components/h1";
import { LinkButtonOnClick } from "~/components/link-button";
import { PageLink } from "~/components/page-link";
import { PasswordForm } from "~/components/password-form";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import { findUserByUsername } from "~/librairies/data/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const verifiedUser = await getVerifiedUser(request);
  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  if (verifiedUser.id !== user.id) {
    await updateUserStatusDashboardById(
      verifiedUser.id,
      "REDIRECTEDTODASHBOARD"
    );
    throw redirect(`/users/${verifiedUser.username}/dashboard`);
  }

  return json({ verifiedUser, user });
};

export function ErrorBoundary() {
  const navigate = useNavigate();

  function handlePreviousNavigation() {
    navigate(-1);
  }

  return (
    <>
      <div className="space-y-4 my-4">
        <p className="mt-2">Could not find requested user.</p>
      </div>
      <PageLink href={`/`}>Return home</PageLink>
      <p className="mt-2">
        <LinkButtonOnClick
          handleClick={handlePreviousNavigation}
          disabled={false}
        >
          Or go back to the previous page
        </LinkButtonOnClick>
      </p>
    </>
  );
}

export default function DashboardModifyPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Modify.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="my-4">
        <AppWideNameForm appWideName={data.verifiedUser.appWideName} />
        <EmailForm email={data.verifiedUser.email} />
        <FriendCodeForm />
        <DeactivateReactivateForms state={data.verifiedUser.state} />
        <PasswordForm />
      </div>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
