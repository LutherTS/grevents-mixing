import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { ManyContacts } from "~/components/many-contacts";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findUserWhoHaveMeBlockedByUserId,
  findUserWhoIAmBlockingByUserId,
} from "~/librairies/data/contacts";
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

  const [userWhoIAmBlocking, userWhoHasMeBlocked] = await Promise.all([
    findUserWhoIAmBlockingByUserId(user.id),
    findUserWhoHaveMeBlockedByUserId(user.id),
  ]);

  return json({ verifiedUser, user, userWhoIAmBlocking, userWhoHasMeBlocked });
};

export default function BlocksPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Blocks.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyContacts
          contacts={data.userWhoIAmBlocking}
          label="Users who I am blocking"
          notLabel="You do not have any users who you are blocking."
        />
        <ManyContacts
          contacts={data.userWhoHasMeBlocked}
          label="Users who have me blocked"
          notLabel="You do not have any users who have you blocked."
        />
      </div>

      <p className="mt-2">
        If you&apos;ve blocked each other, the other user may appear in both
        Users who I am blocking and Users who have me blocked.
      </p>
      <PageLink href={`../friends`}>See friends</PageLink>
    </>
  );
}
