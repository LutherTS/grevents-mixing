import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { AppWideNameForm } from "~/components/app-wide-name-form";
import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { DeactivateReactivateForms } from "~/components/deactivate-form";
import { EmailForm } from "~/components/email-form";
import { FriendCodeForm } from "~/components/friend-code-form";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
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

export default function DashboardModifyPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Modify.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}
      <div className="my-2">
        <AppWideNameForm appWideName={data.verifiedUser.appWideName} />
        <EmailForm email={data.verifiedUser.email} />
        <FriendCodeForm />
        <DeactivateReactivateForms state={data.verifiedUser.state} />
      </div>
      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
