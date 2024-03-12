import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findSentFriendToContactsByUserId,
  findSentIrlToContactsByUserId,
} from "~/librairies/data/contacts";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await findUserByUsername(params.username!);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const [sentFriendToContacts, sentIrlToContacts] = await Promise.all([
    findSentFriendToContactsByUserId(user.id),
    findSentIrlToContactsByUserId(user.id),
  ]);

  return { user, sentFriendToContacts, sentIrlToContacts };
};

export default function RequestsPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Requests.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`../notifications`}>To notifications</PageLink>
    </>
  );
}
