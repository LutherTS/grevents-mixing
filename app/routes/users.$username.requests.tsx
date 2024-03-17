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
  findSentFriendToContactsByUserId,
  findSentIrlToContactsByUserId,
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

  const [sentFriendToContacts, sentIrlToContacts] = await Promise.all([
    findSentFriendToContactsByUserId(user.id),
    findSentIrlToContactsByUserId(user.id),
  ]);

  return json({ verifiedUser, user, sentFriendToContacts, sentIrlToContacts });
};

export default function RequestsPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Requests.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyContacts
          contacts={data.sentFriendToContacts}
          label="Friend requests sent"
          notLabel="You have not sent any friend requests."
        />
        <ManyContacts
          contacts={data.sentIrlToContacts}
          label="Irl upgrade requests sent"
          notLabel="You have not sent any irl friend requests."
        />
      </div>

      <PageLink href={`../notifications`}>To notifications</PageLink>
    </>
  );
}
