import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findSentFriendFromContactsByUserId,
  findSentIrlFromContactsByUserId,
} from "~/librairies/data/contacts";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await findUserByUsername(params.username!);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const [sentFriendFromContacts, sentIrlFromContacts] = await Promise.all([
    findSentFriendFromContactsByUserId(user.id),
    findSentIrlFromContactsByUserId(user.id),
  ]);

  return { user, sentFriendFromContacts, sentIrlFromContacts };
};

export default function NotificationsPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Notifications.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`../requests`}>To requests</PageLink>
    </>
  );
}
