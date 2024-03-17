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
  findUserIrlFriendsByUserId,
  findUserNotIrlFriendsByUserId,
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

  const [userNotIrlFriends, userIrlFriends] = await Promise.all([
    findUserNotIrlFriendsByUserId(user.id),
    findUserIrlFriendsByUserId(user.id),
  ]);

  return json({ verifiedUser, user, userNotIrlFriends, userIrlFriends });
};

export default function FriendsPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Friends.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyContacts
          contacts={data.userNotIrlFriends}
          label="Friends (not upgraded to irl)"
          notLabel="You do not have any not irl friends."
        />
        <ManyContacts
          contacts={data.userIrlFriends}
          label="Upgraded to irl"
          notLabel="You do not have any irl friends."
        />
      </div>

      <PageLink href={`../blocks`}>See blocked users</PageLink>
      <PageLink href={`find`}>Search for contacts</PageLink>
    </>
  );
}
